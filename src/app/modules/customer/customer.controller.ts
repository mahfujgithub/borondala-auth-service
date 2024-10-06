import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CustomerService } from './customer.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ICustomer } from './customer.interface';
import pick from '../../../shared/pick';
import {
  paginationFields,
} from '../../../constants/pagination';
import { customerFilterableFields } from './customer.constant';

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CustomerService.getAllCustomers(paginationOptions, filters);

  sendResponse<ICustomer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CustomerService.getCustomer(id);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Retrieved successfully!',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedDala = req.body;

  const result = await CustomerService.updateCustomer(id, updatedDala);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Updated successfully!',
    data: result,
  });
});

const removeCustomer  = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CustomerService.deleteCustomer(id);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Deleted successfully!',
    data: result,
  });
});

export const CustomerController = {
  getAllCustomers,
  getCustomer,
  updateCustomer,
  removeCustomer
};
