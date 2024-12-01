"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const customer_constant_1 = require("../customer/customer.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        customer: zod_1.z.object({
            role: zod_1.z.string().optional(),
            badge: zod_1.z.string().optional(),
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'field is required!',
                }),
                lastName: zod_1.z.string({
                    required_error: 'field is required!',
                }),
                middleName: zod_1.z.string().optional(),
            }),
            email: zod_1.z
                .string({
                required_error: 'field is required!',
            })
                .email(),
            image: zod_1.z.string().optional(),
            password: zod_1.z.string({
                required_error: 'field is required!',
            }),
            confirmPassword: zod_1.z.string({
                required_error: 'field is required!',
            }),
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
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        defaultAdminAndSellerPassword: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'field is required!',
                }),
                lastName: zod_1.z.string({
                    required_error: 'field is required!',
                }),
                middleName: zod_1.z.string().optional(),
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
exports.UserValidation = {
    createUserZodSchema,
    createAdminZodSchema
};