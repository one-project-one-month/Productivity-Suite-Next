/*
 * Pomodoro Related Tables
 * */

import {
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { TimerType, TodoStatus } from "@/database/enums";
import { user } from "@/database/auth-schema";

/*
 * Timer table is used to store the pomodoro sessions of the user.
 * Category column is used to distinguish between the focus session and the break session
 * */
export const timers = pgTable("timer", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    duration: integer("duration").notNull(),
    remaining: integer("remaining").notNull(),
    type: TimerType("type").notNull(),
});

// TODO: Find a way to add a constraint in priority column
/**
 * Sequence table is used to store the detail information of the pomodoro sequence
 * */
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

/*
 * TimerSequence table track the relationship between the sequence and the timers.
 * Its also track the location of time in the sequence.
 * */
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

/*
 * Todos table is used to store the todos-item of the users.
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

/*
 * Note table is used to store the notes of the users.
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

/**
 * Category Table is used to track the category of the defined budget plan.
 * In order to avoid name clashing, it is decided to make the name column to become unique
 * */
export const category = pgTable("category", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("category", { length: 255 }).notNull().unique(),
});

/**
 * Transaction table is store the expanse of user related to the certain category
 * */
export const transactions = pgTable("transaction", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: text("user_id")
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
    categoryId: uuid("category_id")
        .references(() => category.id)
        .notNull(),
    amount: integer("amount").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

/**
 * Budget table is store the budget plan of the user.
 * Category must be unique for each budget plan.
 * Plan will be tracked by utilizing durationFrom and durationTo fields.
 * */
export const budget = pgTable("budget", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: text("user_id")
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
    amount: integer("amount").notNull(),
    categoryId: uuid("category_id")
        .references(() => category.id)
        .notNull()
        .unique(),
    amountSpent: integer("amountSpent").notNull().default(0),
    durationFrom: timestamp("duration_from", { withTimezone: true }).notNull(),
    durationTo: timestamp("duration_to", { withTimezone: true }).notNull(),
});
