import ApiError from '../../../../../errors/ApiError';
import { Watch } from './watch.model';
import { IWatch } from './watch.interface';
import { IPaginationOptions } from '../../../../../interfaces/pagination';
import { IGenericResponse } from '../../../../../interfaces/common';
import { paginationHelpers } from '../../../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createWatch = async (payload: IWatch): Promise<IWatch | null> => {
  const createdWatch = await Watch.create(payload);

  if (!createdWatch) {
    throw new ApiError(400, `Failed to create Watch!`);
  }

  return createdWatch;
};

const getAllWatches = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IWatch[]>> => {

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: {[key: string]: SortOrder} = {}

    if(sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder
    }

  const result = await Watch.find().sort(sortConditions).skip(skip).limit(limit);

  const total = await Watch.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const WatchService = {
  createWatch,
  getAllWatches,
};
