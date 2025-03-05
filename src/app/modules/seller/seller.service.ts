import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ISeller, ISellerFilters } from './seller.interface';
import { Seller } from './seller.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { sellerSearchableFields } from './seller.constant';

const getAllSellers = async (
  paginationOptions: IPaginationOptions,
  filters: ISellerFilters,
): Promise<IGenericResponse<ISeller[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: sellerSearchableFields.map(field => ({
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

  const result = await Seller.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Seller.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSeller = async (id: string): Promise<ISeller | null> => {
  const result = await Seller.findById(id);

  return result;
};

const updateSeller = async (
  id: string,
  payload: Partial<ISeller>,
): Promise<ISeller | null> => {
  const isExist = await Seller.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found!');
  }

  if (Object.hasOwn(payload, 'badge')) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Updating the 'badge' is not allowed!",
    );
  }

  const { name, ...SellerData } = payload;

  const updatedSellerData: Partial<ISeller> = { ...SellerData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof ISeller;
      (updatedSellerData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Seller.findOneAndUpdate({ id }, updatedSellerData, {
    new: true,
  });
  return result;
};

const deleteSeller = async (id: string): Promise<ISeller | null> => {
  const result = await Seller.findByIdAndDelete(id);

  return result;
};

export const SellerService = {
  getAllSellers,
  getSeller,
  updateSeller,
  deleteSeller,
};
