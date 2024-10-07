import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from 'express';
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import { ILoginUserResponse } from "./auth.interface";
import config from "../../../config";


const loginUser = catchAsync(async (req: Request, res: Response) => {
    const {...loginData} = req.body;

    const result = await AuthService.loginUser(loginData);

    const {refreshToken, ...others} = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    if ('refreshToken' in result) {
      delete result.refreshToken;
    }

    // set refresh token into cookie
    res.cookie('refreshToken', refreshToken, cookieOptions);

    

    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Logged in successfully!',
      data: others,
    });
});

export const AuthController = {
  loginUser,
};
