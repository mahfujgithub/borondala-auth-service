"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DalaRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const dala_controller_1 = require("./dala.controller");
router.post('/create-dala', dala_controller_1.DalaController.createDala);
router.get('/dala', dala_controller_1.DalaController.getAllDala);
exports.DalaRoutes = router;
