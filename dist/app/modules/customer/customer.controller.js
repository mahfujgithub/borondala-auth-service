"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const customer_service_1 = require("./customer.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const customer_constant_1 = require("./customer.constant");
const getAllCustomers = (0, catchAsync_1.default)(async (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.user);
    const filters = (0, pick_1.default)(req.query, customer_constant_1.customerFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await customer_service_1.CustomerService.getAllCustomers(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
const getCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await customer_service_1.CustomerService.getCustomer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Retrieved successfully!',
        data: result,
    });
});
const updateCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedCustomer = req.body;
    const result = await customer_service_1.CustomerService.updateCustomer(id, updatedCustomer);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Updated successfully!',
        data: result,
    });
});
const removeCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await customer_service_1.CustomerService.deleteCustomer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer Deleted successfully!',
        data: result,
    });
});
exports.CustomerController = {
    getAllCustomers,
    getCustomer,
    updateCustomer,
    removeCustomer
};
