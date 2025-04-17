import { z } from "zod";

const loginValidationShcema = z.object({
  body: z.object({
    identifier: z
      .string({ required_error: "Email or Phone is required" })
      .min(1, "Email or Phone is required"),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh Token is required!" }),
  }),
});

export const AuthValidation = {
  loginValidationShcema,
  refreshTokenValidationSchema,
};
