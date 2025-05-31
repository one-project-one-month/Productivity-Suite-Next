"use server";

import { Category } from "@/database/interfaces.types";
import { db } from "@/database/drizzle";
import { category } from "@/database/schema";
import { eq } from "drizzle-orm";

export const updateCategory = async (payload: Category) => {
  try {
    const data = await db
      .update(category)
      .set(payload)
      .where(eq(category.id, payload.id))
      .returning();
    if (!data) {
      return { success: false, message: "Failed to update category" };
    }

    return { success: true, message: "Successfully updated category" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to update category" };
  }
};
