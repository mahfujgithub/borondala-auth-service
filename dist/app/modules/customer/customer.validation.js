"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidation = void 0;
const zod_1 = require("zod");
const customer_constant_1 = require("./customer.constant");
const updateCustomerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        badge: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        }),
        email: zod_1.z.string().email().optional(),
        image: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        confirmPassword: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...customer_constant_1.gender]).optional(),
        DOB: zod_1.z.string().optional(),
        contact: zod_1.z.string().optional(),
        emergencyContact: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
    }),
});
exports.CustomerValidation = {
    updateCustomerZodSchema,
};
