import config from '../../../config/index'
import { User } from './user.model'
import { IUser } from './users.interface'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  // default password

  const id = await generateUserId();

  user.id = id;

  if (!user.password) {
    user.password = config.defaultPassword as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error(`Failed to create user!`)
  }

  return createdUser
}

export default {
  createUser,
}
