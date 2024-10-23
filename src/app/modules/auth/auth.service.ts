import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Customer } from '../customer/customer.model';
import { IAuth, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
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
  const { email: customerEmail, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { customerEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { customerEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const customer = new Customer();

  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!');
  }

  const { customerEmail } = verifiedToken;

  const isUserExist = await customer.isUserExist(customerEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
