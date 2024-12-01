import { Model, Types } from 'mongoose';

export type AdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdmin = {
  id?: string;
  name: AdminName; //embedded object
  email: string;
  password?: string;
  image?: string;
  gender?: 'male' | 'female' | 'non-binary';
  DOB?: string;
  contact: string;
  emergencyContact?: string;
  presentAddress: string;
  permanentAddress?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contact?: string;
};
