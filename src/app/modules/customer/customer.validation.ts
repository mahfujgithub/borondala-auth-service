import { z } from 'zod';
import { gender } from './customer.constant';

const updateCustomerZodSchema = z.object({
  body: z.object({
    badge: z.string().optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),
    email: z.string().email().optional(),
    image: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    DOB: z.string().optional(),
    contact: z.string().optional(),
    emergencyContact: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
  }),
});

export const CustomerValidation = {
  updateCustomerZodSchema,
};
