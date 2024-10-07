import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from "../../../config"

const userSchema = new Schema<IUser, UserModel>(
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
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'customers',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'admins',
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser, UserModel>('Users', userSchema);
