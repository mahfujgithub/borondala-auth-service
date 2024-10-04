// import config from '../../../../config/index'
import ApiError from '../../../errors/ApiError';
import { User } from './user.model';
import { IUser } from './user.interface';
import { generateCustomerId } from './user.utils';
import { ICustomer } from '../customer/customer.interface';
import config from '../../../config';
import mongoose from 'mongoose';
import { Customer } from '../customer/customer.model';
import httpStatus from 'http-status';
// import { generateUserId } from './user.utils'

const createCustomer = async (
  customer: ICustomer,
  user: IUser,
): Promise<IUser | null> => {
  

  if (!user.defaultAdminAndSellerPassword) {
    user.defaultAdminAndSellerPassword =
      config.defaultAdminAndSellerPassword as string;
  }

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
};
