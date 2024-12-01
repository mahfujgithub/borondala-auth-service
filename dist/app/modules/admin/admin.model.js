"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.AdminSchema = void 0;
const mongoose_1 = require("mongoose");
const admin_constant_1 = require("./admin.constant");
const config_1 = __importDefault(require("../../../config"));
exports.AdminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
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
    password: {
        type: String,
        default: config_1.default.defaultAdminPassword,
    },
    image: {
        type: String,
    },
    gender: {
        type: String,
        enum: admin_constant_1.gender,
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
exports.Admin = (0, mongoose_1.model)('Admins', exports.AdminSchema);
