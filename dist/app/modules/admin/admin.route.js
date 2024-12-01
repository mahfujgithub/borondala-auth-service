"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../users/user.controller");
const admin_controller_1 = require("../admin/admin.controller");
const user_validation_1 = require("../users/user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
// Creating an Admin (Admin Route)
router.post('/create', (0, validateRequest_1.default)(user_validation_1.UserValidation.createAdminZodSchema), user_controller_1.UserController.createAdmin);
// Get All Admins Info (Admin Route)
router.get('/', (0, auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), admin_controller_1.AdminController.getAllAdmins);
exports.AdminRoutes = router;
