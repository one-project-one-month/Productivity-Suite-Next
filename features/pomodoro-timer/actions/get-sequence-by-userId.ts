"use server";

import { eq } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { sequences } from "@/database/schema";

export const getSequenceByUserId = async (userId: string) => {
  try {
    const res = await db
      .select({
        id: sequences.id,
        category: sequences.category,
        description: sequences.description,
        priority: sequences.priority,
      })
      .from(sequences)
      .where(eq(sequences.userId, userId));

    if (!res) {
      return undefined;
    }

    // console.log(res);
    return res;
  } catch (error) {
    console.error("Failed to fetch sequences:", error);
    return [];
  }
};
