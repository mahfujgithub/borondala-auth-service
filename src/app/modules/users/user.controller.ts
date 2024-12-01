import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

// const createCustomer = catchAsync(
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

const registerCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customer, user } = req.body;

  const result = await UserService.createCustomer(customer, user);

  if (!result) {
    // If result is null, respond with an error
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to register customer!',
    );
  }

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  // set refresh token into cookie
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Customer registered successfully!',
    data: others
  });
});

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
  // createCustomer,
  registerCustomer,
  createAdmin
};
