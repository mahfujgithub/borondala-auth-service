"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
const customer_constant_1 = require("./customer.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
exports.CustomerSchema = new mongoose_1.Schema({
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
    badge: {
        type: String,
        default: 'general',
    },
    name: {
        type: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true },
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: customer_constant_1.gender,
    },
    DOB: {
        type: String,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
    },
    emergencyContact: {
        type: String,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.CustomerSchema.methods.isUserExist = async function (email) {
    return await exports.Customer.findOne({ email }, { email: 1, role: 1, password: 1 });
};
exports.CustomerSchema.methods.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcrypt_1.default.compare(givenPassword, savedPassword);
};
exports.CustomerSchema.pre('save', async function (next) {
    const customer = this;
    customer.password = await bcrypt_1.default.hash(customer.password, Number(config_1.default.bycrypt_salt_rounds));
    next();
});
exports.Customer = (0, mongoose_1.model)('Customers', exports.CustomerSchema);
