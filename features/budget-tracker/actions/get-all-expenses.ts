"use server";

import { db } from "@/database/drizzle";
import { budget, category, transactions } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

export const getAllExpenses = async () => {
  try {
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
      .orderBy(desc(transactions.createdAt));
    return data;
  } catch (error) {
    console.log(error);
  }
};
