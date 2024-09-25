import { NextFunction, Request, Response } from 'express';
import { WatchService } from './watch.service';
import catchAsync from '../../../../../shared/catchAsync';
import sendResponse from '../../../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IWatch } from './watch.interface';
import pick from '../../../../../shared/pick';
import { paginationFields } from '../../../../../constants/pagination';

const createWatch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...watch } = req.body;

    const result = await WatchService.createWatch(watch);

    sendResponse<IWatch>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Watch created successfully!',
      data: result,
    });

    next();
  },
);

const getAllWatches = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {    

    const paginationOptions = pick(req.query, paginationFields)

    const result = await WatchService.getAllWatches(paginationOptions);

    sendResponse<IWatch[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Watches Retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });

    next();
  },
);

export const WatchController = {
  createWatch,
  getAllWatches,
};
