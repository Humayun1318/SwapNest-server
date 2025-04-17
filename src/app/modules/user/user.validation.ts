import { z } from "zod";
import { UserRole } from "./user.interface";

const userValidationShcema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required!" })
      .trim()
      .min(1, "Name cannot be empty or contain only spaces")
      .refine((value) => !/^\s*$/.test(value), {
        message: "Name cannot contain only spaces",
      }),
    identifier: z
      .string({ required_error: "Email or phone is required!" })
      .refine(
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^\d{11}$/.test(val),
        {
          message: "Must be a valid email or phone number (11 digits)",
        },
      ),

    role: z.enum([UserRole.USER, UserRole.ADMIN]).default(UserRole.USER),
    password: z
      .string({ required_error: "Password is required!" })
      .trim()
      .min(1, "Password cannot be empty or only spaces")
      .refine((password) => !/^\s*$/.test(password), {
        message: "Password cannot contain only spaces",
      }),
  }),
});
const updateUserValidationShcema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required!" })
      .trim()
      .min(1, "Name cannot be empty or contain only spaces")
      .refine((value) => !/^\s*$/.test(value), {
        message: "Name cannot contain only spaces",
      })
      .optional(),
    email: z
      .string({ required_error: "Email is required." })
      .email("Invalid email address")
      .optional(),
    phone: z
      .string()
      .regex(/^\d{11}$/, "Phone number must be exactly 11 digits long")
      .optional(),
    role: z
      .enum([UserRole.USER, UserRole.ADMIN])
      .default(UserRole.USER)
      .optional(),
    password: z
      .string({ required_error: "Password is required!" })
      .trim()
      .min(1, "Password cannot be empty or only spaces")
      .refine((password) => !/^\s*$/.test(password), {
        message: "Password cannot contain only spaces",
      }),
  }),
});

export const UserValidation = {
  userValidationShcema,
  updateUserValidationShcema,
};
