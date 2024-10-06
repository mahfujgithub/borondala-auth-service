import { Request, Response } from 'express';
import catchAsync from '../../../../../shared/catchAsync';
import { DalaService } from './dala.service';
import sendResponse from '../../../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IDala } from './dala.interface';
import pick from '../../../../../shared/pick';
import {
  dalaFilterableFields,
  paginationFields,
} from '../../../../../constants/pagination';

const createDala = catchAsync(async (req: Request, res: Response) => {
  const { ...dala } = req.body;

  const result = await DalaService.createDala(dala);

  sendResponse<IDala>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dala created successfully!',
    data: result,
  });
});

const getAllDala = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, dalaFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DalaService.getAllDala(paginationOptions, filters);

  sendResponse<IDala[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dala Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDala = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DalaService.getSingleDala(id);

  sendResponse<IDala>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dala Retrieved successfully!',
    data: result,
  });
});

const updateDala = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedDala = req.body;

  const result = await DalaService.updateDala(id, updatedDala);

  sendResponse<IDala>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dala Updated successfully!',
    data: result,
  });
});

const deleteDala = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DalaService.deleteDala(id);

  sendResponse<IDala>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item Deleted successfully!',
    data: result,
  });
});

export const DalaController = {
  createDala,
  getAllDala,
  getSingleDala,
  updateDala,
  deleteDala,
};
