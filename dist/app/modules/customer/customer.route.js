"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const customer_controller_1 = require("../customer/customer.controller");
const user_controller_1 = require("../users/user.controller");
const user_validation_1 = require("../users/user.validation");
const customer_validation_1 = require("./customer.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
// Signup Customer Himself/Herself
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createCustomer);
// Get All Customers Info (Admin Route)
router.get('/', (0, auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), customer_controller_1.CustomerController.getAllCustomers);
// Get Customer Info Himself/Herself
router.get('/:id', customer_controller_1.CustomerController.getCustomer);
// Update Customer Info Himself/Herself
router.patch('/:id', (0, validateRequest_1.default)(customer_validation_1.CustomerValidation.updateCustomerZodSchema), customer_controller_1.CustomerController.updateCustomer);
// // Delete Customer Info (Admin Route)
router.delete('/:id', (0, auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), customer_controller_1.CustomerController.removeCustomer);
exports.CustomerRoutes = router;
