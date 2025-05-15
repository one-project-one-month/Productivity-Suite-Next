"use server";

import "server-only";
import { redirect } from "next/navigation";
import { createNewNote } from ".";

// export async function getNoteContentById(noteId:string) {
//   const res = await
// }

export async function addNoteAction(userId: string) {
  const newNote = (await createNewNote(userId))[0];
  redirect(`/notes/${newNote.id}`);
}
