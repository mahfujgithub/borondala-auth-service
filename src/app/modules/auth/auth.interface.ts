import { Model } from 'mongoose';

export type IAuth = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
}

export type AuthModel = Model<IAuth, Record<string, unknown>>;
