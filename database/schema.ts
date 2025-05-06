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
} from "drizzle-orm/pg-core";
import { TimerType } from "@/database/enums";
import { user } from "@/database/auth-schema";

export const timer = pgTable("timer", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    duration: integer("duration").notNull(),
    remaining: integer("remaining").notNull(),
    type: TimerType("type").notNull(),
});

// TODO: Find a way to add a constraint in priority column
export const sequence = pgTable("sequence", {
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
