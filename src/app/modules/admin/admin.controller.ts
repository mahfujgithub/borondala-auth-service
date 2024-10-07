import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { adminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(
    paginationOptions,
    filters,
  );

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.getAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Retrieved successfully!',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedDala = req.body;

  const result = await AdminService.updateAdmin(id, updatedDala);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Updated successfully!',
    data: result,
  });
});

const removeCustomer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted successfully!',
    data: result,
  });
});

export const CustomerController = {
  getAllCustomers,
  getCustomer,
  updateCustomer,
  removeCustomer,
};
