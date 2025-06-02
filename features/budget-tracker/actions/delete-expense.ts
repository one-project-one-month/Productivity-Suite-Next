"use server";

import { db } from "@/database/drizzle";
import { transactions } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteExpense = async (id: string) => {
  try {
    const data = await db
      .delete(transactions)
      .where(eq(transactions.id, id))
      .returning();
    if (!data) {
      return { success: false, message: "Failed to delete expense" };
    }
    return { success: true, message: "Successfully deleted" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to delete expense" };
  }
};
