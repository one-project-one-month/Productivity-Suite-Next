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

export const createOrUpdateTodo = actionClient
  .schema(todoSchema)
  .action(
    async ({ parsedInput: { id, title, description, dueAt, priority } }) => {
      const userId = "QJLm9FxIQoCq47g8oTWEW6GeNiyTtAZN";
      try {
        if (id) {
          const existingTodo = await db.query.todos.findFirst({
            where: eq(todos.id, id),
          });
          if (!existingTodo) return { error: "Todo not found" };

          await db
            .update(todos)
            .set({ title, description, dueAt, priority: Number(priority) })
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
    const todosData = await db.query.todos.findMany({
      orderBy: [asc(todos.dueAt), desc(todos.priority)],
    });
    if (!todosData) {
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
