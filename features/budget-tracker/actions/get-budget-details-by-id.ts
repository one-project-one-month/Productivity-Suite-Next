"use server";

import { db } from "@/database/drizzle";
import { budget } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getBudgetDetailsById = async (id: string) => {
  try {
    const [data] = await db.select().from(budget).where(eq(budget.id, id));
    return data;
  } catch (error) {
    console.log(error);
  }
};
