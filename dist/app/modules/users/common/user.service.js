"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// import config from '../../../../config/index'
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const user_model_1 = require("./user.model");
// import { generateUserId } from './user.utils'
const createUser = async (user) => {
    const createdUser = await user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(400, `Failed to create user!`);
    }
    return createdUser;
};
exports.UserService = {
    createUser,
};
