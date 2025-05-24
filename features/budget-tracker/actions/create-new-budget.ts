"use server";

import { TNewBudgetSchema } from "@/database/validators";
import { db } from "@/database/drizzle";
import { budget } from "@/database/schema";
import { getUserSession } from "@/lib/server-util";

export const createNewBudget = async (payload: TNewBudgetSchema) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return {
        success: false,
        message: "Unauthorized Request",
      };
    }
    const data = await db
      .insert(budget)
      .values({
        ...payload,
        userId: session.user.id,
      })
      .returning();
    if (!data) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
