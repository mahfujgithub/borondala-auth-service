"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const seller_service_1 = require("./seller.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const seller_constant_1 = require("./seller.constant");
const getAllSellers = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, seller_constant_1.sellerFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await seller_service_1.SellerService.getAllSellers(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
const getSeller = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await seller_service_1.SellerService.getSeller(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Retrieved successfully!',
        data: result,
    });
});
const updateSeller = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedCustomer = req.body;
    const result = await seller_service_1.SellerService.updateSeller(id, updatedCustomer);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Updated successfully!',
        data: result,
    });
});
const removeSeller = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await seller_service_1.SellerService.deleteSeller(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Deleted successfully!',
        data: result,
    });
});
exports.SellerController = {
    getAllSellers,
    getSeller,
    updateSeller,
    removeSeller,
};
