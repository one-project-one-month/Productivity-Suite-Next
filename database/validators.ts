import { createInsertSchema } from "drizzle-zod";
import { user } from "@/database/auth-schema";
import { z } from "zod";

const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one number",
  })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const SignUpFormSchema = createInsertSchema(user, {
  name: (schema) =>
    schema
      .min(5, { message: "Name must be at least 5 character" })
      .max(25, { message: "Name must be at most 25 character" }),
  email: (schema) => schema.email(),
})
  .pick({
    email: true,
    name: true,
  })
  .extend({
    password: password,
  });

export type SignUpSchema = Zod.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignInSchema = Zod.infer<typeof SignInFormSchema>;
