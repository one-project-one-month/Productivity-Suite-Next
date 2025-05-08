"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/features/notes/components/Editor"), { ssr: false});

export default function Note() {
  return (
    <div className="">
      <div className="w-full bg-blue-500 h-dvh">
        <Editor />
      </div>
    </div>
  );
}
