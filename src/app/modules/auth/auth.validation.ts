import { z } from 'zod';

const createAuthZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'field is required!',
      })
      .email(),
    password: z.string({
      required_error: 'field is required!',
    }),
  }),
});

export const AuthValidation = {
  createAuthZodSchema,
};
