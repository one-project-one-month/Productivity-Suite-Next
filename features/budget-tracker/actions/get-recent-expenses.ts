"use server";

import { getUserSession } from "@/lib/server-util";
import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

export const getRecentExpenses = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }

    const data = await db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        createdAt: transactions.createdAt,
        category: category.name,
        budgetTitle: budget.title,
        title: transactions.title,
      })
      .from(transactions)
      .where(eq(transactions.userId, session.user.id))
      .leftJoin(budget, eq(transactions.budgetId, budget.id))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .orderBy(desc(transactions.createdAt))
      .limit(5);
    return data;
  } catch (error) {
    console.log(error);
  }
};
