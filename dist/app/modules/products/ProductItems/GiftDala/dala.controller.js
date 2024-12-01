"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DalaController = void 0;
const catchAsync_1 = __importDefault(require("../../../../../shared/catchAsync"));
const dala_service_1 = require("./dala.service");
const sendResponse_1 = __importDefault(require("../../../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../../../shared/pick"));
const pagination_1 = require("../../../../../constants/pagination");
const createDala = (0, catchAsync_1.default)(async (req, res, next) => {
    const { ...dala } = req.body;
    const result = await dala_service_1.DalaService.createDala(dala);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Dala created successfully!',
        data: result
    });
    next();
});
const getAllDala = (0, catchAsync_1.default)(async (req, res, next) => {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await dala_service_1.DalaService.getAllDala(paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Dala Retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.DalaController = {
    createDala,
    getAllDala,
};
