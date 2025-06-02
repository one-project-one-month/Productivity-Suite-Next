"use server";

import { db } from "@/database/drizzle";
import { and, eq, gte, lte, sum } from "drizzle-orm";
import { budget, category, transactions } from "@/database/schema";
import { addMonths, setDate, subDays } from "date-fns";

export const getCategoryBreakdown = async () => {
  try {
    const fromDate = setDate(new Date(), 1);
    const toDate = subDays(addMonths(fromDate, 1), 1);

    const sq = db
      .select({
        spent: sum(transactions.amount).mapWith(Number).as("spent"),
        budgetId: transactions.budgetId,
      })
      .from(transactions)
      .groupBy(transactions.budgetId)
      .where(
        and(
          gte(transactions.createdAt, fromDate),
          lte(transactions.createdAt, toDate),
        ),
      )
      .as("sq");

    const data = await db
      .select({
        name: category.name,
        value: sum(sq.spent).mapWith(Number).as("budget"),
      })
      .from(budget)
      .leftJoin(sq, eq(budget.id, sq.budgetId))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .groupBy(category.name);
    return data;
  } catch (error) {
    console.log(error);
  }
};
