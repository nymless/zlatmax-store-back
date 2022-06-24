import { z } from "zod";

export const UserCreateRequest = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.enum(["USER", "ADMIN"]),
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().optional(),
    preferredName: z.string().optional(),
  }),
});

export const UserLoginRequest = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
