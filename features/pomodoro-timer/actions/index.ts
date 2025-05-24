"use server";

import { db } from "@/database/drizzle";
import { sequences, timers, timerSequence } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function deletePomodoro(id: string) {
  await db.delete(sequences).where(eq(sequences.id, id));
}

export type ITimer = typeof timers.$inferInsert;
export async function addTimer(data: ITimer) {
  return await db.insert(timers).values(data).returning();
}

export type ITimerSequence = typeof timerSequence.$inferInsert;
export async function addTimerSequenceToDb(data: ITimerSequence) {
  return await db.insert(timerSequence).values(data).returning();
}

// export async function addStep() {

// }

// export default async function updateTimerOnPageLoad() {
//   await db.update()
// }
