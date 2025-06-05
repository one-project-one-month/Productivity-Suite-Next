import { createInsertSchema } from "drizzle-zod";
import { user } from "@/database/auth-schema";
import { z } from "zod";
import { budget, category, todos, transactions } from "./schema";
import { addDays, set } from "date-fns";
import { TodoPriority } from "@/database/enums";

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

export const NewBudgetSchema = createInsertSchema(budget, {
  title: (schema) =>
    schema.min(6, { message: "Title must be at least 6 character" }),
  amount: (schema) => schema.positive().min(100),
  durationTo: (schema) => schema.min(addDays(new Date(), 1)),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type TNewBudgetSchema = Zod.infer<typeof NewBudgetSchema>;

export const NewExpenseSchema = createInsertSchema(transactions, {
  amount: (schema) => schema.positive().min(1),
  title: (schema) =>
    schema.min(6, { message: "Title must be at least 6 character" }),
}).omit({
  id: true,
  userId: true,
  updatedAt: true,
});

export type TNewExpenseSchema = Zod.infer<typeof NewExpenseSchema>;

export const CategorySchema = createInsertSchema(category, {
  color: (schema) => schema.refine((color) => color.length === 7),
  name: (schema) =>
    schema.min(5, {
      message: "Category name should be at least 5 characters.",
    }),
}).omit({ id: true, userId: true });

export type TCategorySchema = Zod.infer<typeof CategorySchema>;

export const CreateTodoSchema = createInsertSchema(todos, {
  title: (schema) =>
    schema.min(10, { message: "Title must be at least 10 character" }),
  priority: (schema) =>
    schema.refine((value) => TodoPriority.enumValues.indexOf(value) >= 0),
  dueAt: (schema) =>
    schema
      .min(set(new Date(), { hours: 0, minutes: 0, seconds: 0 }))
      .optional(),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  completedAt: true,
  status: true,
});

export type TCreateTodoSchema = Zod.infer<typeof CreateTodoSchema>;
