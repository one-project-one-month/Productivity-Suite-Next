"use client";

import dynamic from "next/dynamic";
import { INoteType, TNoteType } from "./note-types";
const Editor = dynamic(() => import("@/features/notes/components/Editor"), {
  ssr: false,
});

export default function NoteEditor({
  data,
  mutate,
}: {
  data: TNoteType;
  mutate: (data: INoteType) => Promise<void>;
}) {
  return (
    <div className="min-h-[calc(100dvh-80px)]">
      <Editor
        data={data}
        mutate={mutate}
        // id={id}
        // title={title}
        // body={body}
        // createdAt={createdAt}
        // updatedAt={updatedAt}
      />
    </div>
  );
}
