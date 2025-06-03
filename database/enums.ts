import { pgEnum } from "drizzle-orm/pg-core";

export const TimerType = pgEnum("timer_type_enum", ["FOCUS", "BREAK"]);

export const TodoStatus = pgEnum("todo_status_enum", ["PENDING", "COMPLETE"]);
export const TodoPriority = pgEnum("todo_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "IMPORTANT",
]);

export type TimerType = (typeof TimerType.enumValues)[number];
export type TodoStatus = (typeof TodoStatus.enumValues)[number];
