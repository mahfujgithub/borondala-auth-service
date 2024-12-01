"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    badgeName: {
        type: String,
        default: '',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
}, {
    timestamps: true,
});
exports.Customer = (0, mongoose_1.model)('Customers', customerSchema);
