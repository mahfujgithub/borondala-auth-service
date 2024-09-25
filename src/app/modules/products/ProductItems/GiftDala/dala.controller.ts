import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../../../shared/catchAsync";
import { DalaService } from "./dala.service";
import sendResponse from "../../../../../shared/sendResponse";
import httpStatus from "http-status";
import { IDala } from "./dala.interface";
import pick from "../../../../../shared/pick";
import { paginationFields } from "../../../../../constants/pagination";

const createDala = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {...dala} = req.body;

        const result = await DalaService.createDala(dala);

        sendResponse<IDala>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Dala created successfully!',
            data: result
        })

        next();
    }
) 

const getAllDala = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await DalaService.getAllDala(paginationOptions);

    sendResponse<IDala[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dala Retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const DalaController = {
  createDala,
  getAllDala,
};