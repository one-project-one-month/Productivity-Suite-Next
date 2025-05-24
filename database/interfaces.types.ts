import { InferSelectModel } from "drizzle-orm";
import {
  budget,
  category,
  notes,
  todos,
  transactions,
} from "@/database/schema";

export type Todo = InferSelectModel<typeof todos>;
export type Note = InferSelectModel<typeof notes>;
export type Transaction = InferSelectModel<typeof transactions>;
export type Budget = InferSelectModel<typeof budget>;
export type Category = InferSelectModel<typeof category>;
