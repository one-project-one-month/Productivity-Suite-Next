"use server";

import { db } from "@/database/drizzle";
import { todos } from "@/database/schema";
import { getUserSession } from "@/features/auth/actions/get-user-session";
import { TCreateTodoSchema } from "@/database/validators";
import { eq } from "drizzle-orm";

export const updateTodo = async (
  id: string,
  payload: Partial<TCreateTodoSchema>,
) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return {
        success: false,
        message: "Unauthorized Request",
      };
    }

    const data = await db
      .update(todos)
      .set({
        ...payload,
      })
      .where(eq(todos.id, id))
      .returning();

    if (!data) {
      return {
        success: false,
        message: "Error Updating New Task",
      };
    }
    return {
      success: true,
      message: "Task Updated Successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error Updating New Task",
    };
  }
};
