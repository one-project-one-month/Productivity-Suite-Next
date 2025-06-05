"use server";

import { getUserSession } from "@/features/auth/actions/get-user-session";
import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { and, avg, count, eq, lte, max, sum, gte } from "drizzle-orm";
import { getThisMonth } from "@/lib/utils";

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
        durationFrom: budget.durationFrom,
        durationTo: budget.durationTo,
      })
      .from(budget)
      .leftJoin(transactions, eq(transactions.budgetId, budget.id))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .groupBy(
        budget.amount,
        budget.title,
        category.name,
        category.color,
        budget.description,
        budget.createdAt,
        budget.durationFrom,
        budget.durationTo,
      )
      .where(and(eq(budget.id, id), eq(budget.userId, session.user.id)));

    if (!data) {
      return null;
    }
    const { start, end } = getThisMonth();

    const [thisMonth] = await db
      .select({
        count: count(transactions.id),
      })
      .from(transactions)
      .leftJoin(budget, eq(transactions.budgetId, budget.id))
      .where(
        and(
          eq(budget.id, id),
          eq(budget.userId, session.user.id),
          gte(transactions.createdAt, start),
          lte(transactions.createdAt, end),
        ),
      );

    return { ...data, transactionThisMonth: thisMonth.count };
  } catch (error) {
    console.log(error);
  }
};
