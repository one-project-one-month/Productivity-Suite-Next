import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.string().min(1, "Priority is required").max(1),
  status: z.enum(["PENDING", "COMPLETED", "OVERDUE"]).optional(),
  dueAt: z.date(),
});

export type TodoSchema = z.infer<typeof todoSchema>;

export const deleteTodoSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteTodoInput = z.infer<typeof deleteTodoSchema>;
