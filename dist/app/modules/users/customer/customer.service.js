"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const customer_model_1 = require("./customer.model");
const customer_utils_1 = require("./customer.utils");
const user_model_1 = require("../common/user.model");
const createCustomer = async (user, customer) => {
    const newUser = await user_model_1.User.create(user);
    if (!newUser) {
        throw new ApiError_1.default(400, `Failed to create user!`);
    }
    const id = await (0, customer_utils_1.generateCustomerId)();
    customer.id = id;
    const newCustomer = await customer_model_1.Customer.create({
        ...customer,
        user: newUser._id,
    });
    if (!newCustomer) {
        throw new ApiError_1.default(400, 'Failed to create customer!');
    }
    return {
        user: newUser,
        customer: newCustomer,
    };
};
exports.CustomerService = {
    createCustomer
};
