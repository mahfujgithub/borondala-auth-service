import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  badge: string;
  name: string;
  phone: number;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
