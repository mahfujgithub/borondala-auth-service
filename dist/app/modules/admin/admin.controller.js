"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const admin_constant_1 = require("./admin.constant");
const getAllAdmins = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, admin_constant_1.adminFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await admin_service_1.AdminService.getAllAdmins(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin Retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
const getSingleAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await admin_service_1.AdminService.getSingleAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin Retrieved successfully!',
        data: result,
    });
});
const updateAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedAdmin = req.body;
    const result = await admin_service_1.AdminService.updateAdmin(id, updatedAdmin);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin Updated successfully!',
        data: result,
    });
});
const removeAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.AdminService.deleteAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin Deleted successfully!',
        data: result,
    });
});
exports.AdminController = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    removeAdmin,
};
