"use server";

import { getUserSession } from "@/features/auth/actions/get-user-session";
import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { and, avg, count, eq, max, sum } from "drizzle-orm";

export const getBudgetDetailsOverview = async (id: string) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
    const [data] = await db
      .select({
        title: budget.title,
        description: budget.description,
        category: category.name,
        categoryColor: category.color,
        amountSpent: sum(transactions.amount).mapWith(Number),
        numOfTransactions: count(transactions.id),
        totalBudget: budget.amount,
        averageSpent: avg(transactions.amount).mapWith(Number),
        largestTransaction: max(transactions.amount).mapWith(Number),
        createdAt: budget.createdAt,
      })
      .from(transactions)
      .leftJoin(budget, eq(transactions.budgetId, budget.id))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .groupBy(
        budget.amount,
        budget.title,
        category.name,
        category.color,
        budget.description,
        budget.createdAt,
      )
      .where(and(eq(transactions.budgetId, id)));
    return data;
  } catch (error) {
    console.log(error);
  }
};
