import { Model, Types } from 'mongoose'

export type ICustomer = {
  id: string
  gender: string
  badgeName: string
  user: Types.ObjectId
}

export type CustomerModel = Model<ICustomer, Record<string, unknown>>
