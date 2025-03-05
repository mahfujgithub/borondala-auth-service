import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SellerService } from './seller.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { sellerFilterableFields } from './seller.constant';
import { ISeller } from './seller.interface';

const getAllSellers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, sellerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SellerService.getAllSellers(
    paginationOptions,
    filters,
  );

  sendResponse<ISeller[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSeller = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SellerService.getSeller(id);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Retrieved successfully!',
    data: result,
  });
});

const updateSeller = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedCustomer = req.body;

  const result = await SellerService.updateSeller(id, updatedCustomer);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Updated successfully!',
    data: result,
  });
});

const removeSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SellerService.deleteSeller(id);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer Deleted successfully!',
    data: result,
  });
});

export const SellerController = {
  getAllSellers,
  getSeller,
  updateSeller,
  removeSeller,
};
