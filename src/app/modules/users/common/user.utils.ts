import { User } from './user.model';

let lastUserId = 0;

export const findLastCustomerId = async () => {
  const lastCustomer = await User.findOne({
    role: 'customer'
  }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastCustomer?.id ? lastCustomer?.id?.substring(4) : undefined;
};

export const generateCustomerId = async () => {
  const currentId =
    (await findLastCustomerId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `C-${incrementedId}`

  return incrementedId;
};

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({
    role: 'admin'
  }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id?.substring(4) : undefined;
};

export const generateAdminId = async () => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `A-${incrementedId}`

  return incrementedId;
};
