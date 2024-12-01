import { z } from 'zod';
import { gender } from '../customer/customer.constant';

const updateAdminZodSchema = z.object({
  body: z.object({
    defaultAdminAndSellerPassword: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'field is required!',
        }),
        lastName: z.string({
          required_error: 'field is required!',
        }),
        middleName: z.string().optional(),
      }),
      email: z
        .string({
          required_error: 'field is required!',
        })
        .email(),
      image: z.string().optional(),
      gender: z.enum([...gender] as [string, ...string[]]).optional(),
      DOB: z.string().optional(),
      contact: z.string({
        required_error: 'field is required!',
      }),
      emergencyContact: z.string().optional(),
      presentAddress: z.string({
        required_error: 'field is required!',
      }),
      permanentAddress: z.string().optional(),
    }),
  }),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
