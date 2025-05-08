"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
// import {Highlight} from "@tiptap/extension-highlight";
// import {Code} from "@tiptap/extension-code";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import MenuBar from "./menu";
import { setUpCodeBlock } from "./code-block";

export default function Editor() {
  const lowlight = setUpCodeBlock();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "py-0! my-3! border! border-muted-foreground!",
          },
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),
      // Code,
      // Highlight,
      Markdown.configure({
        html: false, // Set to true if you want to allow HTML tags
        tightLists: true,
        bulletListMarker: "-", // Use "-" for bullet lists
        linkify: true, // Automatically convert URLs into links
        breaks: false, // Convert newlines to <br> tags
        transformPastedText: true, // Transform pasted text to Markdown
        transformCopiedText: true, // Transform copied text to Markdown
      }),
    ],
    content: "## Header \n\n```js \n\ncons a = true; \n\n```",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "bg-muted w-full h-full p-3 shrink-0 block basis-full",
      },
    },
  });

  // editor?.commands.setHighlight();
  // editor?.commands.setHighlight({ color: "#ffcc00" });

  // console.log(editor);
  // console.log(editor?.storage.markdown.getMarkdown());

  return (
    <div
      className="
      prose dark:prose-invert 
      prose-li:leading-5 
      prose-headings:py-0 prose-headings:my-2 
      prose-p:leading-6 prose-p:my-0 prose-p:py-1
      prose-code:bg-muted-foreground prose-code:px-1 prose-code:rounded-xs prose-code:text-background prose-code:my-0
      prose-blockquote:my-1 prose-blockquote:py-1
      prose-pre:bg-primary prose-code:in-prose-pre:bg-primary
      prose-a:text-blue-500 prose-a:underline
    "
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
