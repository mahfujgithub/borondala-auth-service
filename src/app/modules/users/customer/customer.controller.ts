import { NextFunction, Request, RequestHandler, Response } from 'express';
import { CustomerService } from './customer.service';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import httpStatus from 'http-status';

const createCustomer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, ...customer } = req.body;

    const result = await CustomerService.createCustomer(user, customer);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    });

    next();
  },
);

export const CustomerController = {
  createCustomer,
};
