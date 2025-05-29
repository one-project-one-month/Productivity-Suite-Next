"use server";

import { getUserSession } from "@/lib/server-util";
import { db } from "@/database/drizzle";
import { budget, transactions } from "@/database/schema";
import { and, asc, eq, gte, lte, sum } from "drizzle-orm";
import { getThisMonth } from "@/lib/utils";
import { addDays, format, getDaysInMonth, isEqual, set } from "date-fns";
import { IDailySpendingChart } from "@/features/budget-tracker/components/chart/daily-spending-trend";

export const getDailySpendingTrends = async (id: string) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
    const { start, end } = getThisMonth();
    const data = await db
      .select({
        createdAt: transactions.createdAt,
        amount: transactions.amount,
        totalSpent: sum(transactions.amount).mapWith(Number),
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
      )
      .groupBy(transactions.createdAt, transactions.amount)
      .orderBy(asc(transactions.createdAt));

    if (!data) {
      return [];
    }

    const thisMonthData = Array.from({ length: getDaysInMonth(start) }).map(
      (_, idx) => ({
        day: format(addDays(start, idx), "MMM d"),
        amount: 0,
        totalAmount: 0,
        cumulativeAmount: 0,
      }),
    );
    return data.reduce((acc, curr) => {
      const day = format(
        set(curr.createdAt, { hours: 0, minutes: 0, seconds: 0 }),
        "MMM d",
      );
      const cumulativeAmount = acc.reduce((acc, curr) => acc + curr.amount, 0);
      return acc.map((item) => {
        if (isEqual(item.day, day)) {
          return {
            ...item,
            cumulativeAmount,
            amount: curr.amount,
          };
        }
        return item;
      });
    }, thisMonthData) as unknown as IDailySpendingChart[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
