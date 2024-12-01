"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DalaService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../../errors/ApiError"));
const dala_model_1 = require("./dala.model");
const paginationHelper_1 = require("../../../../../helpers/paginationHelper");
const createDala = async (payload) => {
    const createdDala = await dala_model_1.Dala.create(payload);
    if (!createDala) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Dala!');
    }
    return createdDala;
};
const getAllDala = async (paginationOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = await dala_model_1.Dala.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await dala_model_1.Dala.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.DalaService = {
    createDala,
    getAllDala
};
