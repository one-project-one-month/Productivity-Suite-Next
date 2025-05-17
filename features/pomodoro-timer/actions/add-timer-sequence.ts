"use server";

import { db } from "@/database/drizzle";
import { sequences } from "@/database/schema";

export type timerSequencePayLoad = {
  userId: string;
  category: string;
  description: string;
  priority: number;
  createdAt: Date;
};
export const addTimerSequence = async (payload: timerSequencePayLoad) => {
  const [newSequence] = await db
    .insert(sequences)
    .values({
      userId: payload.userId,
      category: payload.category,
      description: payload.description,
      priority: payload.priority,
      createdAt: payload.createdAt,
    })
    .returning();

  if (!newSequence) {
    throw new Error("Failed");
  }

  return newSequence;
};
