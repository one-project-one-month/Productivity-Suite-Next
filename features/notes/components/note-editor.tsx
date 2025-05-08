"use client";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/features/notes/components/Editor"), { ssr: false});

export default function NoteEditor() {
  return (
    <div className="min-h-[calc(100dvh-80px)]">
        <Editor title="Note-1" 
                body={"## Header1 \n`poop`\n```js\n console.log('hi') \n```\n > quote text"} 
                createdAt={new Date("12 3 2020")}
                updatedAt={new Date("12 3 2020")}
        />
    </div>
  );
}
