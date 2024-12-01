"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dala = void 0;
const mongoose_1 = require("mongoose");
// import { IWatch, WatchModel } from './watch.interface';
const ApiError_1 = __importDefault(require("../../../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const dalaSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    images: { type: [String], required: true },
    dalaCode: { type: Number, required: true },
    items: { type: [String], required: true },
    details: { type: [Object], required: true },
    description: { type: String, required: true },
    price: {
        type: Number,
        min: [1, 'Wrong min price'],
        max: [10000, 'Wrong max price'],
    },
    discountPercentage: {
        type: Number,
        min: [1, 'Wrong min discount'],
        max: [99, 'Wrong max discount'],
    },
    rating: { type: Number, required: true },
    stock: { type: String, required: true },
    deleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
dalaSchema.pre('save', async function (next) {
    const isExist = await exports.Dala.findOne({ title: this.dalaCode });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'This dala is already exist!');
    }
    next();
});
exports.Dala = (0, mongoose_1.model)('Dalas', dalaSchema);
