"use server";
import { db } from "@/database/drizzle";
import { todos } from "@/database/schema";
import { eq } from "drizzle-orm";
import { actionClient } from "./safe-action";
import { todoSchema } from "../types/todo-schema";

export const createOrUpdateTodo = actionClient.schema(todoSchema).action(async ({ parsedInput: { id, title, description, dueAt, priority } }) => {

    try {
        if (id) {
            const existingTodo = await db.query.todos.findFirst({ where: eq(todos.id, id) })
            if (!existingTodo) return { error: "Todo not found" }

            await db.update(todos).set({ title, description, dueAt, priority: Number(priority) }).where(eq(todos.id, id))
            return { success: `${title} updated successfully` }
        } else {
            const todo = await db.insert(todos).values({
                title, description, dueAt, userId: "1", priority: priority ? Number(priority) : undefined,
            }).returning()
            return { success: `${todo[0].title} created successfully` }
        }
    } catch (error) {
        console.error("Database Error:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        return { error: `Something went wrong: ${error instanceof Error ? error.message : String(error)}` }
    }

});


