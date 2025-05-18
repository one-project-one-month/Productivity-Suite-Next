// import Note from "@/features/notes/components/note";

import { getNotesByUserId, searchNotesByUserId } from "@/features/notes/actions";
import AddNoteBtn from "@/features/notes/components/btn/add-note-btn";
import Note from "@/features/notes/components/note";
import { TNoteType } from "@/features/notes/components/note-types";
import Search from "@/features/notes/components/search";
import { getUserSession } from "@/lib/server-util";
import { Ghost, GhostIcon } from "lucide-react";
import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";

export const metadata: Metadata = {
  title: "My Notes",
  description: "Notes Taking app",
};

export default async function NotePage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  const session = await getUserSession();
  if (!session) redirect("/auth/sign-in");
  const notes = (await getNotesByUserId(session.user.id)) as TNoteType[];
  const searchNotes = await searchNotesByUserId(q);
  const searchIds = searchNotes.map(s => s.id);

  const filteredNotes = notes.filter(note => q ? searchIds.includes(note.id) : true);
  // console.log(searchId);
  // console.log(notes);
  // console.log(q);

  async function handleSearch(formData:FormData) {
    "use server";
    const q = formData.get("q") as string;
    // console.log(q);
    redirect("/notes?q=" + q, RedirectType.replace);
  }

  // async function resetAction() {
  //   "use server";
  //   redirect("/notes", RedirectType.replace);
  // }

  if (notes.length == 0) {
    return (
      <div className="w-full h-[calc(100dvh-80px)] grid place-items-center">
        <div className="flex flex-col items-center justify-center">
          <Ghost size={120} className="text-foreground opacity-20 " />
          <p className="text-muted-foreground mb-3 text-center">
            You dont&apos; have any notes.<br /> 
            Start by adding a new one.
          </p>
          <AddNoteBtn userId={session.user.id} />
        </div>
      </div>
    );
  }
  return (
    <section className="bg-background text-foreground max-w-7xl mx-auto">
      <div className="flex gap-3 items-center justify-center mb-2">
        {/* <form action={async (formData:FormData) => {
          "use server";
          redirect("/notes?q=" + formData.get("q"));
        }} className="border border-red-400 flex">
          <Input defaultValue={q} name="q" placeholder="search..." className="max-w-md border-0 ring-0 shadow-none" />
          <Button variant="ghost">x</Button>
        </form> */}
        <Search q={q} action={handleSearch} />
        <AddNoteBtn userId={session.user.id} />
      </div>

      {
        q &&
        <div>
          {
            searchIds.length == 0 ?
              <div className="w-full h-[calc(100dvh-120px)] text-center flex items-center justify-center flex-col">
                <GhostIcon size={62} className="opacity-30" />
                <p className="text-muted-foreground">No results for <b className="text-foreground">{q}</b></p>
              </div>
              :
              <span className="pl-3 text-muted-foreground">Showing Notes for the word <b className="text-foreground">{q}</b></span>
          }
        </div>
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 ">
        {
          filteredNotes
          .map((item, idx) => (
            <Note key={idx} {...item} />
          ))
        }
      </div>
    </section>
  );
}
