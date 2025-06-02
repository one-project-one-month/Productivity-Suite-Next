"use server";

import { db } from "@/database/drizzle";
import { budget } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteBudget = async (id: string) => {
  try {
    const data = await db.delete(budget).where(eq(budget.id, id)).returning();
    if (!data) {
      return {
        success: false,
        message: "Error Deleting BudgetPlan",
      };
    }
    return {
      success: true,
      message: "BudgetPlan Deleted Successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error Deleting BudgetPlan",
    };
  }
};
