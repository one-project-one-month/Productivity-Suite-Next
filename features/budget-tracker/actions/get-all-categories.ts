"use server";

import { db } from "@/database/drizzle";
import { category } from "@/database/schema";

export const getAllCategories = async () => {
  try {
    const data = await db.select().from(category);
    return data;
  } catch (error) {
    console.log(error);
  }
};
