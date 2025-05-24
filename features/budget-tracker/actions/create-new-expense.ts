"use server";

import { TNewExpenseSchema } from "@/database/validators";
import { db } from "@/database/drizzle";
import { transactions } from "@/database/schema";
import { getUserSession } from "@/lib/server-util";

export const createNewExpense = async (payload: TNewExpenseSchema) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return {
        success: false,
      };
    }
    const data = await db
      .insert(transactions)
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
