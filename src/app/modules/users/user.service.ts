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
// import { generateUserId } from './user.utils'

const createCustomer = async (
  customer: ICustomer,
  user: IUser,
): Promise<IUser | null> => {
  // hash password
  customer.password = await bycrypt.hash(
    customer.password,
    Number(config.bycrypt_salt_rounds),
  );

  customer.confirmPassword = await bycrypt.hash(
    customer.confirmPassword,
    Number(config.bycrypt_salt_rounds),
  );

  let newUserAllData = null;

  // set role
  user.role = 'customer';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateCustomerId();
    user.id = id;
    customer.id = id;

    // array
    const newCustomer = await Customer.create([customer], { session });

    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create customer!`);
    }

    // set customer --> _id into user.customer

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

  return newUserAllData;
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
