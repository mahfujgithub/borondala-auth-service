import config from '../../../../config/index'
import ApiError from '../../../../errors/ApiError'
import { Customer } from './customer.model'
import { ICustomer } from './customer.interface'
// import { generateCustomerId } from './customer.utils'
import { IUser } from '../common/user.interface'
import { User } from '../common/user.model'
import { generateCustomerId } from '../common/user.utils'

const createCustomer = async (
  user: IUser,
  customer: ICustomer,
): Promise<{ user: IUser; customer: ICustomer } | null> => {

  const newUser = await User.create(user)

  if (!newUser) {
    throw new ApiError(400, `Failed to create user!`)
  }

  const id = await generateCustomerId()

  customer.id = id

  const newCustomer = await Customer.create({
    ...customer,
    user: newUser._id,
  })

  if (!newCustomer) {
    throw new ApiError(400, 'Failed to create customer!')
  }

  return {
    user: newUser,
    customer: newCustomer,
  }
}

export const CustomerService = {
  createCustomer
}
