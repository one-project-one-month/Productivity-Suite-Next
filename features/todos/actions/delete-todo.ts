"use server";

import { db } from "@/database/drizzle";
import { todos } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteTodo = async (id: string) => {
  try {
    const data = await db.delete(todos).where(eq(todos.id, id)).returning();
    if (!data) {
      return {
        success: false,
        message: "Error Deleting Task!",
      };
    }
    return {
      success: true,
      message: "Task deleted successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error Deleting Task",
    };
  }
};
