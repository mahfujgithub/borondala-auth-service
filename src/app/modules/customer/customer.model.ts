import { Schema, model } from 'mongoose';
import { ICustomer, CustomerModel } from './customer.interface';
import { gender } from './customer.constant';

export const CustomerSchema = new Schema<ICustomer, CustomerModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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
    }
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
  },
);

export const Customer = model<ICustomer, CustomerModel>(
  'Customers',
  CustomerSchema,
);
