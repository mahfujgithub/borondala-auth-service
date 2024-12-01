"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const customer_model_1 = require("./customer.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const customer_constant_1 = require("./customer.constant");
const getAllCustomers = async (paginationOptions, filters) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: customer_constant_1.customerSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await customer_model_1.Customer.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await customer_model_1.Customer.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getCustomer = async (id) => {
    const result = await customer_model_1.Customer.findById(id);
    return result;
};
const updateCustomer = async (id, payload) => {
    const isExist = await customer_model_1.Customer.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Customer not found!");
    }
    if (Object.hasOwn(payload, 'badge')) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Updating the 'badge' is not allowed!");
    }
    const { name, ...customerData } = payload;
    const updatedCustomerData = { ...customerData };
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedCustomerData[nameKey] = name[key];
        });
    }
    const result = await customer_model_1.Customer.findOneAndUpdate({ id }, updatedCustomerData, {
        new: true,
    });
    return result;
};
const deleteCustomer = async (id) => {
    const result = await customer_model_1.Customer.findByIdAndDelete(id);
    return result;
};
exports.CustomerService = {
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
};
