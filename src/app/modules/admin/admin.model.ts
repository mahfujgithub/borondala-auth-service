import { Schema, model } from 'mongoose';
import { IAdmin, AdminModel } from './admin.interface';
import { gender } from './admin.constant';
import config from '../../../config';

export const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      default: config.defaultAdminPassword,
    },
    image: {
      type: String,
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

export const Admin = model<IAdmin, AdminModel>(
  'Admins',
  AdminSchema,
);
