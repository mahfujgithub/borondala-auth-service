import config from '../../../../config/index'
import ApiError from '../../../../errors/ApiError'
import { User } from './user.model'
import { IUser } from './user.interface'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, `Failed to create user!`)
  }

  return createdUser
}

export const UserService = {
  createUser,
}
