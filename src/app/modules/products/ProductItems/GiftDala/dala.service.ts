import httpStatus from 'http-status';
import ApiError from '../../../../../errors/ApiError';
import { IDala } from './dala.interface';
import { Dala } from './dala.model';
import { IPaginationOptions } from '../../../../../interfaces/pagination';
import { IGenericResponse } from '../../../../../interfaces/common';
import { paginationHelpers } from '../../../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createDala = async (payload: IDala): Promise<IDala | null> => {
  const createdDala = await Dala.create(payload);

  if (!createDala) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Dala!');
  }

  return createdDala;
};

const getAllDala = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDala[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Dala.find()
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


export const DalaService = {
    createDala,
    getAllDala
}