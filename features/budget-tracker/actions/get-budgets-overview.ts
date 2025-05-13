"use server";

import { db } from "@/database/drizzle";
import { budget, transactions } from "@/database/schema";
import { count, eq, sql, sum } from "drizzle-orm";

export const getBudgetsOverview = async () => {
  try {
    const sq = db
      .select({
        budgetId: transactions.budgetId,
        spent: sum(transactions.amount).as("spent"),
      })
      .from(transactions)
      .groupBy(transactions.budgetId)
      .as("sq");
    const [data] = await db
      .select({
        totalBudget: sum(budget.amount).mapWith(Number),
        amountSpent: sum(sq.spent).mapWith(Number),
        activeBudget: count(budget.id),
        activeCategory: sql<number>`count(distinct
        ${budget.categoryId}
        )`.mapWith(Number),
      })
      .from(budget)
      .leftJoin(sq, eq(sq.budgetId, budget.id));
    return data;
  } catch (error) {
    console.log(error);
  }
};
