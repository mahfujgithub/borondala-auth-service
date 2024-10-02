import { Model } from 'mongoose';

export type IUser = {
  name: string;
  phone: number;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
