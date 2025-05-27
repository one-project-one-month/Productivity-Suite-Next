"use server";

import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { getUserSession } from "@/features/auth/actions/get-user-session";
import { and, eq } from "drizzle-orm";

export const getTransactionsByBudgetId = async (id: string) => {
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
        categoryId: category.id,
        description: transactions.description,
        categoryColor: category.color,
        budgetTitle: budget.title,
        title: transactions.title,
        budgetId: budget.id,
      })
      .from(transactions)
      .leftJoin(budget, eq(transactions.budgetId, budget.id))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .where(
        and(eq(transactions.budgetId, id), eq(budget.userId, session.user.id)),
      );
    return data;
  } catch (error) {
    console.log(error);
  }
};
