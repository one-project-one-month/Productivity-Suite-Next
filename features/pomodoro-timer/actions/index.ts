"use server";

import { db } from "@/database/drizzle";
import { sequences, timers, timerSequence } from "@/database/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deletePomodoro(id: string) {
  await db.delete(sequences).where(eq(sequences.id, id));
  await db.delete(timerSequence).where(eq(timerSequence.sequenceId, id));
}

export type ITimer = typeof timers.$inferInsert;
export async function addTimer(data: ITimer) {
  return await db.insert(timers).values(data).returning();
}

export type ITimerSequence = typeof timerSequence.$inferInsert;
export async function addTimerSequenceToDb(data: ITimerSequence) {
  return await db.insert(timerSequence).values(data).returning();
}

export async function getTimerSequenceById(id: string) {
  return await db
    .select()
    .from(timerSequence)
    .where(eq(timerSequence.sequenceId, id))
    .orderBy(asc(timerSequence.step))
    .innerJoin(timers, eq(timerSequence.timerId, timers.id))
    .innerJoin(sequences, eq(timerSequence.sequenceId, sequences.id));
}

export type ITimerUpdate = typeof timers.$inferInsert;
export async function updateTimerOnPageLoad(data: ITimerUpdate) {
  await db.update(timers).set(data).where(eq(timers.id, data.id!));
}

export async function updateTimer(timerId: string, remaining: number) {
  await db
    .update(timers)
    .set({ remaining: remaining })
    .where(eq(timers.id, timerId));
  revalidatePath("/pomodoro-timer");
}

export async function resetDbTimer(timerId: string, remaining: number) {
  await db
    .update(timers)
    .set({ remaining: remaining })
    .where(eq(timers.id, timerId));
  revalidatePath("/pomodoro-timer");
}
