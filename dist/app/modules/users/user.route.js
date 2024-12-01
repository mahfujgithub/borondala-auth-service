"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post(
//   '/create-admin',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createAdmin,
// );
exports.UserRoutes = router;
