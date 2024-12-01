"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchController = void 0;
const watch_service_1 = require("./watch.service");
const catchAsync_1 = __importDefault(require("../../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../../../shared/pick"));
const pagination_1 = require("../../../../../constants/pagination");
const createWatch = (0, catchAsync_1.default)(async (req, res, next) => {
    const { ...watch } = req.body;
    const result = await watch_service_1.WatchService.createWatch(watch);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Watch created successfully!',
        data: result,
    });
    next();
});
const getAllWatches = (0, catchAsync_1.default)(async (req, res, next) => {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await watch_service_1.WatchService.getAllWatches(paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Watches Retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.WatchController = {
    createWatch,
    getAllWatches,
};
