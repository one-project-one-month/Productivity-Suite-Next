"use server";

import { getUserSession } from "@/lib/server-util";
import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { and, desc, eq, gte } from "drizzle-orm";
import { setDate } from "date-fns";

export const getRecentExpenses = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }

    const fromDate = setDate(new Date(), 1);
    const data = await db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        description: transactions.description,
        createdAt: transactions.createdAt,
        categoryId: category.id,
        category: category.name,
        categoryColor: category.color,
        budgetTitle: budget.title,
        budgetId: budget.id,
        title: transactions.title,
      })
      .from(transactions)
      .leftJoin(budget, eq(transactions.budgetId, budget.id))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .orderBy(desc(transactions.createdAt))
      .where(
        and(
          eq(transactions.userId, session.user.id),
          gte(budget.durationTo, fromDate),
        ),
      )
      .limit(5);
    return data;
  } catch (error) {
    console.log(error);
  }
};
