import { pgEnum } from "drizzle-orm/pg-core";

export const TimerType = pgEnum("timer_type_enum", ["FOCUS", "BREAK"]);
