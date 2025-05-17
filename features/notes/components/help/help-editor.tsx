"use client";

import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

export default function HelpEditor({ body }: { body: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        listItem: false,
      }),
      Typography,
      ListItem,
      Link,
      Markdown.configure({
        html: false,
        tightLists: true,
        bulletListMarker: "-",
        linkify: true,
        breaks: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    editable: false,
    content: body,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "inline w-fit field-sizing-content bg-transparent",
      },
    },
  });
  return <EditorContent editor={editor} />;
}
