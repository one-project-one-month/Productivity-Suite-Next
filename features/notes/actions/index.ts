"use server";

import "server-only";
import { db } from "@/database/drizzle";
import { notes } from "@/database/schema";
import { eq, ilike, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//#region CREATE
export async function createNewNote(userId: string) {
  const res = await db
    .insert(notes)
    .values({ userId, title: "Untitled" })
    .returning();
  return res;
}

//#region READ
export async function getNotesByUserId(userId: string) {
  const res = await db
    .select({
      id: notes.id,
      title: notes.title,
      body: sql`left(${notes.body}, 50)`,
      createdAt: notes.createdAt,
      updatedAt: notes.updatedAt,
    })
    .from(notes)
    .where(eq(notes.userId, userId));
  return res;
}

export async function searchNotesByUserId(q:string) {
  const res = await db.select({id:notes.id}).from(notes).where(or (ilike(notes.body,`%${q}%`), ilike(notes.title, `%${notes.title}%`)));
  return res;
}

export async function getNoteTitle(noteId: string) {
  const res = await db.select({title: notes.title}).from(notes).where(eq(notes.id, noteId));
  return res;
}

export async function getNoteContentById(noteId: string) {
  const res = await db
    .select({
      id: notes.id,
      title: notes.title,
      body: notes.body,
      createdAt: notes.createdAt,
      updatedAt: notes.updatedAt,
    })
    .from(notes)
    .where(eq(notes.id, noteId));
  return res[0];
}

//#region UPDATE
export async function updateNote(noteId: string, body: string, title: string) {
  const res = await db
    .update(notes)
    .set({ title, body, updatedAt: new Date() })
    .where(eq(notes.id, noteId));
  revalidatePath(`/notes/${noteId}`);
  return res;
}

//#region DELETE
export async function deleteNote(noteId: string) {
  await db.delete(notes).where(eq(notes.id, noteId));
  revalidatePath("/notes");
}
