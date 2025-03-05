"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const seller_controller_1 = require("../seller/seller.controller");
const user_controller_1 = require("../users/user.controller");
const user_validation_1 = require("../users/user.validation");
const seller_validation_1 = require("./seller.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
// Signup Seller Himself/Herself
router.post('/create', (0, validateRequest_1.default)(user_validation_1.UserValidation.createSellerZodSchema), user_controller_1.UserController.createSeller);
// Get All Sellers Info (Admin Route)
router.get('/', (0, auth_1.default)("seller" /* ENUM_USER_ROLE.SELLER */), seller_controller_1.SellerController.getAllSellers);
// Get Seller Info Himself/Herself
router.get('/:id', seller_controller_1.SellerController.getSeller);
// Update Seller Info Himself/Herself
router.patch('/:id', (0, validateRequest_1.default)(seller_validation_1.SellerValidation.updateSellerZodSchema), seller_controller_1.SellerController.updateSeller);
// // Delete Seller Info (Admin Route)
router.delete('/:id', (0, auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), seller_controller_1.SellerController.removeSeller);
exports.SellerRoutes = router;
