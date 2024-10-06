import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICustomer, ICustomerFilters } from './customer.interface';
import { Customer } from './customer.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { customerSearchableFields } from './customer.constant';

const getAllCustomers = async (
  paginationOptions: IPaginationOptions,
  filters: ICustomerFilters,
): Promise<IGenericResponse<ICustomer[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: customerSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Customer.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Customer.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getCustomer = async (id: string): Promise<ICustomer | null> => {
  const result = await Customer.findById(id);

  return result;
};

const updateCustomer = async (
  id: string,
  payload: Partial<ICustomer>,
): Promise<ICustomer | null> => {

    const isExist = await Customer.findOne({id})

    if(!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Customer not found!")
    }

    if (Object.hasOwn(payload, 'badge')) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Updating the 'badge' is not allowed!",
      );
    }

    const {name, ...customerData} = payload;

    const updatedCustomerData : Partial<ICustomer> = {...customerData};

    if(name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}` as keyof ICustomer;
            (updatedCustomerData as any)[nameKey] = name[key as keyof typeof name]
        })
    }

  const result = await Customer.findOneAndUpdate({ id }, updatedCustomerData, {
    new: true,
  });
  return result;
};

const deleteCustomer  = async (id: string): Promise<ICustomer | null> => {
  const result = await Customer.findByIdAndDelete(id);

  return result;
};

export const CustomerService = {
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
};
