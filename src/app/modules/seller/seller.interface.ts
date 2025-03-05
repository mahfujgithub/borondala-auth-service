import { Model, Types } from 'mongoose';

export type SellerName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type ISeller = {
  id?: string;
  role: string;
  badge?: string;
  name: SellerName; //embedded object
  storeName: string;
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
  isUserExist(email: string): Promise<Partial<ISeller>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type SellerModel = Model<
  ISeller,
  Record<string, unknown>,
  IUserMethods
>;

export type ISellerFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contact?: string;
  presentAddress?: string;
};
