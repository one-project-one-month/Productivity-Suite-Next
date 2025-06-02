"use server";

import { Expense } from "@/database/interfaces.types";
import { db } from "@/database/drizzle";
import { transactions } from "@/database/schema";
import { eq } from "drizzle-orm";

export const updateExpense = async (payload: Partial<Expense>) => {
  try {
    const data = await db
      .update(transactions)
      .set(payload)
      .where(eq(transactions.id, payload.id!))
      .returning();
    if (!data) {
      return {
        success: false,
        message: "Error Updating Expense ",
      };
    }
    return {
      success: true,
      message: "Expense Successfully Updated ",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error Updating Expense ",
    };
  }
};
