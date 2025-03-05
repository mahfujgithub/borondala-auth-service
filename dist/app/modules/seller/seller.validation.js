"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerValidation = void 0;
const zod_1 = require("zod");
const customer_constant_1 = require("../customer/customer.constant");
const updateSellerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        defaultSellerAndSellerPassword: zod_1.z.string().optional(),
        Seller: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'field is required!',
                }),
                lastName: zod_1.z.string({
                    required_error: 'field is required!',
                }),
                middleName: zod_1.z.string().optional(),
            }),
            storeName: zod_1.z
                .string({
                required_error: 'field is required!',
            }),
            email: zod_1.z
                .string({
                required_error: 'field is required!',
            })
                .email(),
            image: zod_1.z.string().optional(),
            gender: zod_1.z.enum([...customer_constant_1.gender]).optional(),
            DOB: zod_1.z.string().optional(),
            contact: zod_1.z.string({
                required_error: 'field is required!',
            }),
            emergencyContact: zod_1.z.string().optional(),
            presentAddress: zod_1.z.string({
                required_error: 'field is required!',
            }),
            permanentAddress: zod_1.z.string().optional(),
        }),
    }),
});
exports.SellerValidation = {
    updateSellerZodSchema,
};
