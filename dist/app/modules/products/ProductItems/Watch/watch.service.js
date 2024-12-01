"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchService = void 0;
const ApiError_1 = __importDefault(require("../../../../../errors/ApiError"));
const Watch_model_1 = require("./Watch.model");
const paginationHelper_1 = require("../../../../../helpers/paginationHelper");
const createWatch = async (payload) => {
    const createdWatch = await Watch_model_1.Watch.create(payload);
    if (!createdWatch) {
        throw new ApiError_1.default(400, `Failed to create Watch!`);
    }
    return createdWatch;
};
const getAllWatches = async (paginationOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = await Watch_model_1.Watch.find().sort(sortConditions).skip(skip).limit(limit);
    const total = await Watch_model_1.Watch.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.WatchService = {
    createWatch,
    getAllWatches,
};
