import { Schema, model } from 'mongoose'
import { ICustomer, CustomerModel } from './customer.interface'
import { User } from '../common/user.model'

const customerSchema = new Schema<ICustomer>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    badgeName: {
      type: String,
      default: '',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    }
  },
  {
    timestamps: true,
  },
)

export const Customer = model<ICustomer, CustomerModel>(
  'Customers',
  customerSchema,
)
