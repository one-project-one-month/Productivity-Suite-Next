"use server";

import { Budget } from "@/database/interfaces.types";
import { db } from "@/database/drizzle";
import { budget } from "@/database/schema";
import { eq } from "drizzle-orm";

export const updateBudget = async (payload: Budget) => {
  try {
    const data = await db
      .update(budget)
      .set(payload)
      .where(eq(budget.id, payload.id))
      .returning();
    if (!data) {
      return { success: false, message: "Error Updating Budget Info" };
    }
    return { success: true, message: "Budget Updated Successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error Updating Budget Info" };
  }
};
