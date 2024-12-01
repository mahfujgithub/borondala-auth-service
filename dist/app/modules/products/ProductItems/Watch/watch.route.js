"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const watch_controller_1 = require("./watch.controller");
router.post('/create-watch', watch_controller_1.WatchController.createWatch);
router.get('/watches', watch_controller_1.WatchController.getAllWatches);
exports.WatchRoutes = router;
