import { Model, Types } from 'mongoose';
import { ICustomer } from '../customer/customer.interface';
import { IAdmin } from '../admin/admin.interface';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  id: string;
  role: string;
  email: string;
  customer?: Types.ObjectId | ICustomer;
  seller?: Types.ObjectId | ISeller;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
