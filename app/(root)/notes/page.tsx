// import Note from "@/features/notes/components/note";

import { Input } from "@/components/ui/input";
import { getNotesByUserId } from "@/features/notes/actions";
import AddNoteBtn from "@/features/notes/components/btn/add-note-btn";
import Note from "@/features/notes/components/note";
import { TNoteType } from "@/features/notes/components/note-types";
import { getUserSession } from "@/lib/server-util";
import { Ghost } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Note",
    default: "Notes",
  },
  description: "Notes Taking app",
};

export default async function NotePage() {
  const session = await getUserSession();
  if (!session) redirect("/auth/sign-in");
  const notes = (await getNotesByUserId(session.user.id)) as TNoteType[];
  // console.log(notes);

  if (notes.length == 0) {
    return (
      <div className="w-full h-[calc(100dvh-80px)] grid place-items-center">
        <div className="flex flex-col items-center justify-center">
          <Ghost size={120} className="text-foreground opacity-20 " />
          <p className="text-muted-foreground mb-3 text-center">
            No notes available.
            <br /> Start by adding a new one.
          </p>
          <AddNoteBtn userId={session.user.id} />
        </div>
      </div>
    );
  }
  return (
    <section className="bg-background text-foreground max-w-7xl mx-auto">
      <div className="flex gap-3 items-center justify-center mb-2">
        <Input type="search" placeholder="search..." className="max-w-md" />
        <AddNoteBtn userId={session.user.id} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 ">
        {notes.map((item, idx) => (
          <Note key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
