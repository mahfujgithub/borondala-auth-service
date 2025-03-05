"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const seller_model_1 = require("./seller.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const seller_constant_1 = require("./seller.constant");
const getAllSellers = async (paginationOptions, filters) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: seller_constant_1.sellerSearchableFields.map(field => ({
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
    const result = await seller_model_1.Seller.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await seller_model_1.Seller.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSeller = async (id) => {
    const result = await seller_model_1.Seller.findById(id);
    return result;
};
const updateSeller = async (id, payload) => {
    const isExist = await seller_model_1.Seller.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Seller not found!');
    }
    if (Object.hasOwn(payload, 'badge')) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Updating the 'badge' is not allowed!");
    }
    const { name, ...SellerData } = payload;
    const updatedSellerData = { ...SellerData };
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedSellerData[nameKey] = name[key];
        });
    }
    const result = await seller_model_1.Seller.findOneAndUpdate({ id }, updatedSellerData, {
        new: true,
    });
    return result;
};
const deleteSeller = async (id) => {
    const result = await seller_model_1.Seller.findByIdAndDelete(id);
    return result;
};
exports.SellerService = {
    getAllSellers,
    getSeller,
    updateSeller,
    deleteSeller,
};
