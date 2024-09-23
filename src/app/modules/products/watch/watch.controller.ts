import { NextFunction, Request, Response } from 'express';
import { WatchService } from './watch.service';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import httpStatus from 'http-status';

const createWatch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...watch } = req.body;

    const result = await WatchService.createWatch(watch);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Watch created successfully!',
      data: result,
    });

    next();
  },
);

export const WatchController = {
  createWatch,
};
