import { z } from "zod";

export const sequenceSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().min(1, "User ID is required"),
  category: z.string().optional(),
  description: z.string().optional(),
  priority: z.string().min(1, "Priority is required").max(1),
  createdAt: z.date(),
});
export type TSequenceSchema = z.infer<typeof sequenceSchema>;
