"use server";

import { getUserSession } from "@/lib/server-util";
import { db } from "@/database/drizzle";
import { budget } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getAllBudgets = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }

    const data = await db
      .select({
        id: budget.id,
        title: budget.title,
      })
      .from(budget)
      .where(eq(budget.userId, session.user.id));
    return data;
  } catch (error) {
    console.log(error);
  }
};
