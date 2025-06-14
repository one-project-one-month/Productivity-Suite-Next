"use server";

import { getUserSession } from "@/features/auth/actions/get-user-session";
import { db } from "@/database/drizzle";
import { todos } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

export const getAllTodos = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
    const data = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, session.user.id))
      .orderBy(desc(todos.createdAt), desc(todos.completedAt));
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
