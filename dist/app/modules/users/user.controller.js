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
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// const createCustomer = catchAsync(
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
const registerCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const { customer, user } = req.body;
    const result = await user_service_1.UserService.createCustomer(customer, user);
    if (!result) {
        // If result is null, respond with an error
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to register customer!');
    }
    const { refreshToken, ...others } = result;
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    // set refresh token into cookie
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Customer registered successfully!',
        data: others
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
    // createCustomer,
    registerCustomer,
    createAdmin
};
