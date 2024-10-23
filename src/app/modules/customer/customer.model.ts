import { Schema, model } from 'mongoose';
import { ICustomer, CustomerModel, IUserMethods } from './customer.interface';
import { gender } from './customer.constant';
import bycrypt from 'bcrypt';

export const CustomerSchema = new Schema<
  ICustomer,
  CustomerModel,
  Record<string, unknown>,
  IUserMethods
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'customer',
      required: true,
    },
    badge: {
      type: String,
      default: 'general',
    },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    DOB: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContact: {
      type: String,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

CustomerSchema.methods.isUserExist = async function (
  email: string,
): Promise<Partial<ICustomer> | null> {
  return await Customer.findOne({ email }, { email: 1, role:1, password: 1 });
};

CustomerSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bycrypt.compare(givenPassword, savedPassword);
};

export const Customer = model<ICustomer, CustomerModel>(
  'Customers',
  CustomerSchema,
);
