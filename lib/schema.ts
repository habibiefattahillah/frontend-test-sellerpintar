import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z.string().min(1, "Please enter your password"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
