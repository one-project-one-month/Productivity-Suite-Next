"use server";

import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { category } from "@/database/schema";

export const deleteCategory = async (id: string) => {
  try {
    const data = await db
      .delete(category)
      .where(eq(category.id, id))
      .returning();
    if (!data) {
      return { success: false, message: "Error Deleting Category" };
    }
    return { success: true, message: "Category Deleted" };
  } catch (error) {
    return { success: false, message: "Error Deleting Category" };
  }
};
