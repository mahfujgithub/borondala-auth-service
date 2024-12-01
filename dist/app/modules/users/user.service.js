"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// import config from '../../../../config/index'
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const customer_model_1 = require("../customer/customer.model");
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = require("../admin/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
// import { generateUserId } from './user.utils'
// const createCustomer = async (
//   customer: ICustomer,
//   user: IUser,
// ): Promise<IUser | null> => {
//   // hash password
//   customer.password = await bycrypt.hash(
//     customer.password,
//     Number(config.bycrypt_salt_rounds),
//   );
//   customer.confirmPassword = await bycrypt.hash(
//     customer.confirmPassword,
//     Number(config.bycrypt_salt_rounds),
//   );
//   let newUserAllData = null;
//   // set role
//   user.role = 'customer';
//   customer.role = 'customer';
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const id = await generateCustomerId();
//     user.id = id;
//     customer.id = id;
//     // array
//     const newCustomer = await Customer.create([customer], { session });
//     if (!newCustomer.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create customer!`);
//     }
//     // set customer --> _id into user.customer
//     user.customer = newCustomer[0]._id;
//     const newUser = await User.create([user], { session });
//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create user!`);
//     }
//     newUserAllData = newUser[0];
//     await session.commitTransaction();
//   } catch (error) {
//     console.error('Error creating customer or user:', error);
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }
//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id });
//   }
//   return newUserAllData;
// };
const createCustomer = async (customer, user) => {
    customer.password = await bcrypt_1.default.hash(customer.password, Number(config_1.default.bycrypt_salt_rounds));
    customer.confirmPassword = await bcrypt_1.default.hash(customer.confirmPassword, Number(config_1.default.bycrypt_salt_rounds));
    let newUserAllData = null;
    user.role = 'customer';
    customer.role = 'customer';
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = await (0, user_utils_1.generateCustomerId)();
        user.id = id;
        customer.id = id;
        const newCustomer = await customer_model_1.Customer.create([customer], { session });
        if (!newCustomer.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create customer!`);
        }
        user.customer = newCustomer[0]._id;
        const newUser = await user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create user!`);
        }
        newUserAllData = newUser[0];
        await session.commitTransaction();
    }
    catch (error) {
        console.error('Error creating customer or user:', error);
        await session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
    if (newUserAllData) {
        newUserAllData = await user_model_1.User.findOne({ id: newUserAllData.id });
    }
    if (!newUserAllData) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'User creation failed!');
    }
    const { id, email, role } = newUserAllData;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, customer, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, email, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        user: newUserAllData,
        accessToken,
        refreshToken,
    };
};
const createAdmin = async (admin, user) => {
    // default password
    if (!admin.password) {
        admin.password = config_1.default.defaultAdminPassword;
    }
    // hash password
    admin.password = await bcrypt_1.default.hash(admin.password, Number(config_1.default.bycrypt_salt_rounds));
    let newUserAllData = null;
    // set role
    user.role = 'admin';
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = await (0, user_utils_1.generateAdminId)();
        user.id = id;
        admin.id = id;
        // array
        const newAdmin = await admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create admin!`);
        }
        // set admin --> _id into user.customer
        user.admin = newAdmin[0]._id;
        const newUser = await user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create user!`);
        }
        newUserAllData = newUser[0];
        await session.commitTransaction();
    }
    catch (error) {
        console.error('Error creating customer or user:', error);
        await session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
    if (newUserAllData) {
        newUserAllData = await user_model_1.User.findOne({ id: newUserAllData.id });
    }
    return newUserAllData;
};
exports.UserService = {
    createCustomer,
    createAdmin,
};
