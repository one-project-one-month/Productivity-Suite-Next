"use client";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/features/notes/components/Editor"), { ssr: false});

export default function NoteEditor() {
  return (
    <div className="min-h-[calc(100dvh-80px)]">
        <Editor 
          title="Note-1" 
          body={"# Header-1 \nlorem ipsum `code` dolor sit amet.\n```js\nconsole.log('hello world') \n```\n \n\n## Sub Header \n > quote text\n\n[google](https://www.google.com) \n\n Hello world\n\n "} 
          createdAt={new Date("12 3 2020")}
          updatedAt={new Date("12 3 2020")}
        />
    </div>
  );
}
