"use server";

import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { eq, sum } from "drizzle-orm";
import { getUserSession } from "@/lib/server-util";

export const getAllBudgetWithDetails = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
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
        durationFrom: budget.durationFrom,
        durationTo: budget.durationTo,
        color: category.color,
        categoryId: category.id,
      })
      .from(budget)
      .leftJoin(sq, eq(budget.id, sq.budgetId))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .where(eq(budget.userId, session.user.id));
    return data;
  } catch (error) {
    console.log(error);
  }
};
