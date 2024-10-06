import { Model, Types } from 'mongoose';
import { ICustomer } from '../customer/customer.interface';

export type IUser = {
  id: string;
  role: string;
  defaultAdminAndSellerPassword?: string;
  customer?: Types.ObjectId | ICustomer;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
