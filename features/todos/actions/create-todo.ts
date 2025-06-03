"use server";

import { db } from "@/database/drizzle";
import { TCreateTodoSchema } from "@/database/validators";
import { todos } from "@/database/schema";
import { getUserSession } from "@/features/auth/actions/get-user-session";

export const createTodo = async (payload: TCreateTodoSchema) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return {
        success: false,
        message: "Unauthorized Request",
      };
    }

    const data = await db
      .insert(todos)
      .values({
        userId: session.user.id,
        ...payload,
      })
      .returning();
    if (!data) {
      return {
        success: false,
        message: "Error Creating New Task",
      };
    }
    return {
      success: true,
      message: "New Task Created",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error Creating New Task",
    };
  }
};
