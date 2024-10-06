import { Model, Types } from 'mongoose';

export type CustomerName = {
    firstName: string;
    middleName?: string;
    lastName: string;
  }

export type ICustomer = {
  id?: string;
  badge?: string;
  name: CustomerName;
  email: string;
  image?: string;
  password: string;
  confirmPassword: string;
  gender?: 'male' | 'female' | 'non-binary';
  DOB?: string;
  contact: string;
  emergencyContact?: string;
  presentAddress: string;
  permanentAddress?: string;
};

export type CustomerModel = Model<ICustomer, Record<string, unknown>>;
