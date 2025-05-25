"use server";

import { db } from "@/database/drizzle";
import { and, eq, gte, lte } from "drizzle-orm";
import { budget, category, transactions } from "@/database/schema";
import {
  addMonths,
  format,
  isAfter,
  isBefore,
  isEqual,
  setDate,
  subDays,
  subMonths,
} from "date-fns";

export const getPastSpending = async () => {
  try {
    const firstDayOfThisMonth = setDate(new Date(), 1);
    const toDate = subDays(addMonths(firstDayOfThisMonth, 1), 1);
    const fromDate = setDate(subMonths(toDate, 5), 1);

    const data = await db
      .select({
        amount: transactions.amount,
        category: category.name,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .leftJoin(budget, eq(transactions.budgetId, budget.id))
      .leftJoin(category, eq(budget.categoryId, category.id))
      .where(
        and(
          gte(transactions.createdAt, fromDate),
          lte(transactions.createdAt, toDate),
        ),
      );
    if (!data) {
      return null;
    }
    const filterByMonth = Array.from({ length: 6 }).map((_, idx) => {
      const currentMonth = idx === 0 ? fromDate : addMonths(fromDate, idx);
      const nextMonth = addMonths(fromDate, idx + 1);
      return data.filter((value) => {
        return (
          isEqual(currentMonth, value.createdAt) ||
          (isBefore(value.createdAt, nextMonth) &&
            isAfter(value.createdAt, currentMonth))
        );
      });
    });

    return filterByMonth.reduce(
      (acc, curr, idx) => {
        const name = format(addMonths(fromDate, idx), "MMM");
        if (curr.length === 0) {
          return [...acc, { name: format(addMonths(fromDate, idx), "MMM") }];
        } else {
          return [
            ...acc,
            {
              name,
              ...curr.reduce(
                (acc, curr) => {
                  const key = curr.category as string;
                  if (!acc[key]) {
                    return { ...acc, [key]: curr.amount };
                  } else {
                    return {
                      ...acc,
                      [key]: acc[key] + curr.amount,
                    };
                  }
                },
                {} as { [key: string]: number },
              ),
            },
          ];
        }
      },
      [] as { [key: string]: string | number }[],
    );
  } catch (error) {
    console.log(error);
  }
};
