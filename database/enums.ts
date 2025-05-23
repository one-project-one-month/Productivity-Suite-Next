import { pgEnum } from "drizzle-orm/pg-core";

export const TimerType = pgEnum("timer_type_enum", ["FOCUS", "BREAK"]);

export const TodoStatus = pgEnum("todo_status_enum", [
  "PENDING",
  "COMPLETE",
  "OVERDUE",
]);

export const CurrencyType = pgEnum("currency_type_enum", [
  "MMK",
  "BTH",
  "USD",
  "SDG",
]);

export type TimerType = (typeof TimerType.enumValues)[number];
export type TodoStatus = (typeof TodoStatus.enumValues)[number];
export type CurrencyType = (typeof CurrencyType.enumValues)[number];
