"use server";

import { db } from "@/database/drizzle";
import { todos } from "@/database/schema";
import { eq } from "drizzle-orm";

export const setCompleteTodo = async (id: string) => {
  try {
    const data = await db
      .update(todos)
      .set({
        completedAt: new Date(),
        status: "COMPLETE",
      })
      .where(eq(todos.id, id))
      .returning();
    if (!data) {
      return {
        success: false,
        message: "Error Updating Task!",
      };
    }
    return {
      success: true,
      message: "Task updated successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error Updating Task!",
    };
  }
};
