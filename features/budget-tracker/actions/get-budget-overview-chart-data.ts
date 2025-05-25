"use server";

import { db } from "@/database/drizzle";
import { budget, transactions } from "@/database/schema";
import { getUserSession } from "@/lib/server-util";
import { eq, isNotNull, sql, sum } from "drizzle-orm";

export const getBudgetOverviewChartData = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
    const sq = db
      .select({
        spent: sql`COALESCE(SUM(
        ${transactions.amount}
        ),
        0
        )`
          .mapWith(Number)
          .as("spent"),
        budgetId: transactions.budgetId,
      })
      .from(transactions)
      .groupBy(transactions.budgetId)
      .as("sq");

    const data = await db
      .select({ name: budget.title, spent: sq.spent, budget: budget.amount })
      .from(budget)
      .leftJoin(sq, eq(budget.id, sq.budgetId))
      .where(isNotNull(sq.spent));
    return data;
  } catch (error) {
    console.log(error);
  }
};
