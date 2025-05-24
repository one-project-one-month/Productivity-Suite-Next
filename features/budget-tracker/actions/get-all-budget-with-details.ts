"use server";

import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { eq, sum } from "drizzle-orm";

export const getAllBudgetWithDetails = async () => {
  try {
    const sq = db
      .select({
        budgetId: transactions.budgetId,
        spent: sum(transactions.amount).mapWith(Number).as("spent"),
      })
      .from(transactions)
      .groupBy(transactions.budgetId)
      .as("sq");
    const data = await db
      .select({
        id: budget.id,
        title: budget.title,
        description: budget.description,
        amount: budget.amount,
        spent: sq.spent,
        category: category.name,
      })
      .from(budget)
      .leftJoin(sq, eq(budget.id, sq.budgetId))
      .leftJoin(category, eq(budget.categoryId, category.id));
    return data;
  } catch (error) {
    console.log(error);
  }
};
