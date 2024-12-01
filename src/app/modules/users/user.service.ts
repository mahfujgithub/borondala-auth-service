// import config from '../../../../config/index'
import ApiError from '../../../errors/ApiError';
import { User } from './user.model';
import { IUser } from './user.interface';
import { generateAdminId, generateCustomerId } from './user.utils';
import { ICustomer } from '../customer/customer.interface';
import config from '../../../config';
import mongoose from 'mongoose';
import { Customer } from '../customer/customer.model';
import httpStatus from 'http-status';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import bycrypt from 'bcrypt'
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
// import { generateUserId } from './user.utils'

// const createCustomer = async (
//   customer: ICustomer,
//   user: IUser,
// ): Promise<IUser | null> => {
//   // hash password
//   customer.password = await bycrypt.hash(
//     customer.password,
//     Number(config.bycrypt_salt_rounds),
//   );

//   customer.confirmPassword = await bycrypt.hash(
//     customer.confirmPassword,
//     Number(config.bycrypt_salt_rounds),
//   );

//   let newUserAllData = null;

//   // set role
//   user.role = 'customer';
//   customer.role = 'customer';

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     const id = await generateCustomerId();
//     user.id = id;
//     customer.id = id;

//     // array
//     const newCustomer = await Customer.create([customer], { session });

//     if (!newCustomer.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create customer!`);
//     }

//     // set customer --> _id into user.customer

//     user.customer = newCustomer[0]._id;

//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user!`);
//     }

//     newUserAllData = newUser[0];

//     await session.commitTransaction();
//   } catch (error) {
//     console.error('Error creating customer or user:', error);
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id });
//   }

//   return newUserAllData;
// };

const createCustomer = async (
  customer: ICustomer,
  user: IUser,
): Promise<{
  user: IUser;
  accessToken: string;
  refreshToken: string;
} | null> => {
  customer.password = await bycrypt.hash(
    customer.password,
    Number(config.bycrypt_salt_rounds),
  );

  customer.confirmPassword = await bycrypt.hash(
    customer.confirmPassword,
    Number(config.bycrypt_salt_rounds),
  );

  let newUserAllData = null;

  user.role = 'customer';
  customer.role = 'customer';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateCustomerId();
    user.id = id;
    customer.id = id;

    const newCustomer = await Customer.create([customer], { session });
    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create customer!`);
    }

    user.customer = newCustomer[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user!`);
    }

    newUserAllData = newUser[0];
    await session.commitTransaction();
  } catch (error) {
    console.error('Error creating customer or user:', error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id });
  }

  if (!newUserAllData) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'User creation failed!',
    );
  }

  const { id, email, role } = newUserAllData;

  const accessToken = jwtHelpers.createToken(
    { id, customer, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    user: newUserAllData,
    accessToken,
    refreshToken,
  };
};



const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  
// default password
  if (!admin.password) {
    admin.password = config.defaultAdminPassword as string;
  }

  // hash password
  admin.password = await bycrypt.hash(
    admin.password,
    Number(config.bycrypt_salt_rounds),
  );

  let newUserAllData = null;

  // set role
  user.role = 'admin';

  const session = await mongoose.startSession();

  
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    // array
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create admin!`);
    }

    // set admin --> _id into user.customer

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], {session})

    if(!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user!`);
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
  } catch (error) {
    console.error('Error creating customer or user:', error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if(newUserAllData) {
    newUserAllData = await User.findOne({id: newUserAllData.id});
  }

  return newUserAllData;
};



export const UserService = {
  createCustomer,
  createAdmin,
};
