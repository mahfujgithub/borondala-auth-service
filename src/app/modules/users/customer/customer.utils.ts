import { Customer } from './customer.model'

let lastUserId = 0

export const findLastCustomerId = async () => {
  const lastUser = await Customer.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

export const generateCustomerId = async () => {
  const currentId = (await findLastCustomerId()) || (0).toString().padStart(5, '0')

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  return incrementedId

  // lastUserId++;
  // return String(lastUserId).padStart(5, '0')
}
