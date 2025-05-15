import { getNoteContentById, updateNote } from "@/features/notes/actions";
import NoteEditor from "@/features/notes/components/note-editor";
import { INoteType } from "@/features/notes/components/note-types";
// import { getUserSession } from "@/lib/server-util";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // const session = await getUserSession();
  const data = await getNoteContentById(id);

  async function mutateNote(data: INoteType) {
    "use server";
    await updateNote(id, data.body || "", data.title);
    // console.log("SAVED!!!");
  }

  return (
    <section className="max-w-7xl mx-auto">
      <NoteEditor data={data} mutate={mutateNote} />
    </section>
  );
}
