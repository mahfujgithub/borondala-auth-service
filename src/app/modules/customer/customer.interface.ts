import { Model, Types } from 'mongoose';

export type CustomerName = {
    firstName: string;
    middleName?: string;
    lastName: string;
  }

export type ICustomer = {
  id?: string;
  badge?: string;
  name: CustomerName; //embedded object
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

export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<ICustomer>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type CustomerModel = Model<ICustomer, Record<string, unknown>, IUserMethods>;

export type ICustomerFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contact?: string;
  presentAddress?: string;
};


