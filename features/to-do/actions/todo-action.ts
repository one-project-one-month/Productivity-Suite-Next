"use server";
import { db } from "@/database/drizzle";
import { todos } from "@/database/schema";
import { asc, desc, eq } from "drizzle-orm";
import { actionClient } from "./safe-action";
import {
  deleteTodoSchema,
  statusUpdateSchema,
  todoSchema,
} from "../types/todo-schema";
import { getUserSession } from "@/lib/server-util";

export const createOrUpdateTodo = actionClient
  .schema(todoSchema)
  .action(
    async ({ parsedInput: { id, title, description, dueAt, priority } }) => {
      const session = await getUserSession();
      const userId = session?.user.id;

      if (!userId) {
        return { error: "Unauthorized: No user session found." };
      }

      try {
        if (id) {
          const existingTodo = await db.query.todos.findFirst({
            where: eq(todos.id, id),
          });
          if (!existingTodo) return { error: "Todo not found" };

          await db
            .update(todos)
            .set({
              title,
              description,
              dueAt,
              priority: Number(priority),
              status: "PENDING",
            })
            .where(eq(todos.id, id));
          return { success: `${title} updated successfully` };
        } else {
          const todo = await db
            .insert(todos)
            .values({
              title,
              description,
              dueAt,
              userId,
              priority: priority ? Number(priority) : undefined,
            })
            .returning();
          return { success: `${todo[0].title} created successfully` };
        }
      } catch (error) {
        console.error(
          "Database Error:",
          JSON.stringify(error, Object.getOwnPropertyNames(error)),
        );
        return {
          error: `Something went wrong: ${error instanceof Error ? error.message : String(error)}`,
        };
      }
    },
  );

export const getTodos = async () => {
  try {
    const session = await getUserSession();
    const userId = session?.user.id;

    // Step 1: Fetch all todos for the user
    const allTodos = await db.query.todos.findMany({
      where: userId ? eq(todos.userId, userId) : undefined,
    });

    // Step 2: Check each todo and update status if overdue
    const now = new Date();
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    for (const todo of allTodos) {
      if (
        todo.status !== "COMPLETE" &&
        todo.dueAt &&
        new Date(todo.dueAt) < endOfToday
      ) {
        await db
          .update(todos)
          .set({ status: "OVERDUE" })
          .where(eq(todos.id, todo.id));
      }
    }

    // Step 3: Re-fetch updated todos with ordering
    const todosData = await db.query.todos.findMany({
      where: userId ? eq(todos.userId, userId) : undefined,
      orderBy: [asc(todos.dueAt), desc(todos.priority)],
    });

    if (!todosData || todosData.length === 0) {
      return { error: "No todos found!" };
    }

    return { success: todosData };
  } catch (error) {
    console.error(
      "Database Error:",
      JSON.stringify(error, Object.getOwnPropertyNames(error)),
    );
    return {
      error: `Something went wrong: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};

export const deleteTodo = actionClient
  .schema(deleteTodoSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      if (!id) return { error: "Missing ID for deletion" };
      await db.delete(todos).where(eq(todos.id, id));
      return { success: "Product deleted successfully" };
    } catch (error) {
      console.error(
        "Database Error:",
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      );
      return {
        error: `Something went wrong: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  });

export const updateStatus = actionClient
  .schema(statusUpdateSchema)
  .action(async ({ parsedInput: { id, status } }) => {
    try {
      if (!id) return { error: "Missing ID for deletion" };

      const todo = await db.query.todos.findFirst({ where: eq(todos.id, id) });
      if (!todo) return { error: "Todo not found" };

      if (todo.status === "OVERDUE") {
        return {
          error:
            "Cannot manually update status to OVERDUE or extend the dueDate",
        };
      }

      await db.update(todos).set({ status }).where(eq(todos.id, id));
      return { success: "Product status updated successfully" };
    } catch (error) {
      console.error(
        "Database Error:",
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      );
      return {
        error: `Something went wrong: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  });
