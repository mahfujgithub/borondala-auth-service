"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'customer',
        required: true,
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'customers',
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'admins',
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('Users', userSchema);
