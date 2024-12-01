"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const customer_controller_1 = require("./customer.controller");
router.post('/create-customer', customer_controller_1.CustomerController.createCustomer);
exports.CustomerRoutes = router;
