import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "@/database/auth-schema";
import { TimerType, TodoStatus } from "@/database/enums";

/*
 * Pomodoro Related Tables
 * */
export const timers = pgTable("timer", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  duration: integer("duration").notNull(),
  remaining: integer("remaining").notNull(),
  type: TimerType("type").notNull(),
});

// TODO: Find a way to add a constraint in priority column
export const sequences = pgTable("sequence", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  category: text("category"),
  description: text("description"),
  priority: integer("priority"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const timerSequence = pgTable(
  "timer_sequence",
  {
    timerId: uuid("timer_id").notNull(),
    sequenceId: uuid("sequence_id").notNull(),
    step: integer("step").notNull(),
  },
  (table) => [primaryKey({ columns: [table.sequenceId, table.timerId] })],
);

/*
 *  Todolist Table
 * */

export const todos = pgTable("todo", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  status: TodoStatus("status").default("PENDING").notNull(),
  priority: integer("priority").default(1).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  dueAt: timestamp("due_at", { withTimezone: true }),
});

/*
 * Note related tables
 * */

export const notes = pgTable("note", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

/*
 * Budget Management Related Tables
 * */

export const category = pgTable("category", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("category", { length: 255 }).notNull().unique(),
  color: varchar({ length: 7 }).notNull(),
});

export const userCategory = pgTable(
  "user_category",
  {
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => category.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.categoryId, table.userId] })],
);

export const budget = pgTable("budget", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  amount: integer("amount").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  categoryId: uuid("category_id")
    .references(() => category.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  durationFrom: timestamp("duration_from", { withTimezone: true })
    .defaultNow()
    .notNull(),
  durationTo: timestamp("duration_to", { withTimezone: true }).notNull(),
});

export const transactions = pgTable("transaction", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  budgetId: uuid("budget_id")
    .references(() => budget.id)
    .notNull(),
  amount: integer("amount").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});
