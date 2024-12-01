"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watch = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const watchSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
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
    rating: {
        type: Number,
        min: [0, 'Wrong min rating'],
        max: [5, 'Wrong max rating'],
        default: 0,
    },
    stock: {
        type: Number,
        min: [0, 'Wrong min rating'],
        default: 0,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
watchSchema.pre('save', async function (next) {
    const isExist = await exports.Watch.findOne({ title: this.title });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'This watch is already exist!');
    }
    next();
});
exports.Watch = (0, mongoose_1.model)('Watches', watchSchema);
