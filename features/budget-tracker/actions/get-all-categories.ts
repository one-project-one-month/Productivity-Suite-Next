"use server";

import { db } from "@/database/drizzle";
import { category } from "@/database/schema";
import { getUserSession } from "@/lib/server-util";
import { or, eq, isNull } from "drizzle-orm";
import { Category } from "@/database/interfaces.types";

export const getAllCategories = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
    const data = await db
      .select({
        id: category.id,
        name: category.name,
        color: category.color,
      })
      .from(category)
      .where(or(eq(category.userId, session.user.id), isNull(category.userId)));
    return data as Category[];
  } catch (error) {
    console.log(error);
  }
};
