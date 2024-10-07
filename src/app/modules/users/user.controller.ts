import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createCustomer = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.cookies, 'cookie')
    const { customer, ...userData } = req.body;


    const result = await UserService.createCustomer(customer, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  },
);

// const createSeller = catchAsync(
//   async (req: Request, res: Response) => {
//     const { customer, ...userData } = req.body;

//     const result = await UserService.createCustomer(customer, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User created successfully!',
//       data: result,
//     });
//   },
// );

const createAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;

    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  },
);

export const UserController = {
  createCustomer,
  createAdmin
};
