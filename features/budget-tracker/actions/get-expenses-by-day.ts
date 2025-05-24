"use server";

import { db } from "@/database/drizzle";
import { transactions } from "@/database/schema";
import { formatHeatmapDate } from "@/lib/utils";

export const getExpensesByDay = async () => {
  try {
    const data = await db
      .select({
        day: transactions.createdAt,
        value: transactions.amount,
      })
      .from(transactions);

    return (data ?? []).reduce(
      (acc, cur) => {
        const currDay = formatHeatmapDate(cur.day);
        const isInArr = acc.find((item) => item.day === currDay);
        return isInArr
          ? acc.map((item) => {
              if (item.day === currDay) {
                return {
                  day: item.day,
                  value: item.value + cur.value,
                };
              } else {
                return item;
              }
            })
          : [...acc, { day: currDay, value: cur.value }];
      },
      [] as { day: string; value: number }[],
    );
  } catch (error) {
    console.log(error);
  }
};
