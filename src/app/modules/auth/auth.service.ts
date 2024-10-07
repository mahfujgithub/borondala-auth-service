import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Customer } from '../customer/customer.model';
import { IAuth, ILoginUserResponse } from './auth.interface';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';


const loginUser = async (payload: IAuth): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const customer = new Customer();

  //   check user existence
  const isUserExist = await customer.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isUserExist.password &&
    !customer.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  //   create access token & refresh token

  const { email: customerEmail, badge } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { customerEmail, badge },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { customerEmail, badge },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
