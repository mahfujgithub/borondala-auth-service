import httpStatus from 'http-status';
import ApiError from '../../../../../errors/ApiError';
import { IDala, IDalaFilters } from './dala.interface';
import { Dala } from './dala.model';
import { IPaginationOptions } from '../../../../../interfaces/pagination';
import { IGenericResponse } from '../../../../../interfaces/common';
import { paginationHelpers } from '../../../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { dalaSearchableFields } from '../../../../../constants/pagination';

const createDala = async (payload: IDala): Promise<IDala | null> => {
  const createdDala = await Dala.create(payload);

  if (!createDala) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Dala!');
  }

  return createdDala;
};

const getAllDala = async (
  paginationOptions: IPaginationOptions,
  filters: IDalaFilters,
): Promise<IGenericResponse<IDala[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: dalaSearchableFields.map(field => ({
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
  //   {
  //     $or: [
  //       {

  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions} : {};

  const result = await Dala.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Dala.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDala = async (id: string): Promise<IDala | null> => {
  const result = await Dala.findById(id);

  return result;
}

export const DalaService = {
  createDala,
  getAllDala,
  getSingleDala,
};
