"use server";

import { TCategorySchema } from "@/database/validators";
import { getUserSession } from "@/features/auth/actions/get-user-session";
import { db } from "@/database/drizzle";
import { category } from "@/database/schema";

export const createNewCategory = async (payload: TCategorySchema) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return { success: false, message: "Unauthorized Request!" };
    }
    const data = await db
      .insert(category)
      .values({
        ...payload,
        userId: session.user.id,
      })
      .returning();
    if (!data) {
      return { success: false, message: "Failed to create new category!" };
    }
    return { success: true, message: "Created new category!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create new category!" };
  }
};
