"use server";

import { db } from "@/database/drizzle";
import { category, userCategory } from "@/database/schema";
import { getUserSession } from "@/lib/server-util";
import { eq } from "drizzle-orm";
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
      .from(userCategory)
      .leftJoin(category, eq(userCategory.categoryId, category.id))
      .where(eq(userCategory.userId, session.user.id));
    return data as Category[];
  } catch (error) {
    console.log(error);
  }
};
