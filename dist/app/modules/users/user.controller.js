"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const { customer, ...userData } = req.body;
    const result = await user_service_1.UserService.createCustomer(customer, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
    });
});
// const createSeller = catchAsync(
//   async (req: Request, res: Response) => {
//     const { customer, ...userData } = req.body;
//     const result = await UserService.createCustomer(customer, userData);
//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User created successfully!',
//       data: result,
//     });
//   },
// );
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { admin, ...userData } = req.body;
    const result = await user_service_1.UserService.createAdmin(admin, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin created successfully!',
        data: result,
    });
});
exports.UserController = {
    createCustomer,
    createAdmin
};
