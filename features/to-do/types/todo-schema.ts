import { z } from "zod";

export const todoSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    priority: z.enum(["1", "2", "3"]),
    dueAt: z.date()
});

export type TodoSchema = z.infer<typeof todoSchema>;