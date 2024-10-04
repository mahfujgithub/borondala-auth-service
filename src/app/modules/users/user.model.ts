import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from "../../../config"

const userSchema = new Schema<IUser>(
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
    defaultAdminAndSellerPassword: {
      type: String,
      default: config.defaultAdminAndSellerPassword
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'customers',
      required: true
    }
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser, UserModel>('Users', userSchema);
