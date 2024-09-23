import { Model } from 'mongoose'

export type IUser = {
  name: string
  phone: string
  email: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
