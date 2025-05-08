"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import MenuBar from "./menu";
import { setUpCodeBlock } from "./code-block";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Editor({
  title,
  body,
  createdAt,
  updatedAt,
}: {
  title: string;
  body: string;
  updatedAt: Date;
  createdAt: Date
}) {
  const lowlight = setUpCodeBlock();
  const [toggleMd, setToggleMd] = useState(true);
  const [edit, setEdit] = useState(false);
  const [saved, setSaved] = useState(true);
  const [markdownText, setMarkdownText] = useState(body);

  const editor = useEditor({
    extensions: [
      
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
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
      Typography,
      Document,
      Table,
      TableCell,
      TableHeader,
      TableRow,
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
    content: body,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "bg-muted w-full min-h-[calc(100dvh-200px)] p-2 block  ",
      },
    },
  });

  function handleEdit() {
    editor?.setEditable(true);
    setEdit(true);
    setSaved(false);
  }

  function handleSave() {
    editor?.setEditable(false);
    setEdit(false);
    setSaved(true);
  }


  useEffect(() => {
    if (!editor) return;
    editor.setEditable(false);
    if (!toggleMd) {
      const md = editor.storage.markdown.getMarkdown();
      setMarkdownText(md);
    }
  }, [toggleMd, editor]);

  const handleToggle = () => {
    if (!editor) return;

    if (!toggleMd) {
      editor.commands.setContent(markdownText);
    }

    setToggleMd((prev) => !prev);
  };

  return (
    <section className="w-full p-1 min-h-[calc(100dvh-80px)]">
      <div className="w-full mb-2 flex justify-between px-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm" title={createdAt.toString()}>
            Last Saved: {updatedAt.toLocaleDateString()}
          </p>
        </div>
        <div className="space-x-1">
          { saved &&
            <Button size="sm" className="cursor-pointer" onClick={handleEdit}>Edit</Button>
          }
          {
            edit &&
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleToggle}
                className="cursor-pointer hover:bg-muted-foreground/20"
              >
                {toggleMd ? "Markdown" : "Rich Text"}
              </Button>
              <Button onClick={handleSave} size="sm" className="cursor-pointer bg-green-600 hover:bg-green-500">
                <Save /> Save
              </Button>
            </>
          }
        </div>
      </div>

      <div className="">
        <div
          className="max-w-full min-h-[calc(100dvh-150px)] 
          prose dark:prose-invert 
          prose-li:leading-7 prose-li:my-0 prose-li:py-0 prose-p:in-prose-li:p-0
          prose-headings:py-0 prose-headings:my-2 
          prose-p:leading-6 prose-p:my-0 prose-p:py-1
          prose-code:bg-[oklch(0.205_0_0)] prose-code:px-1.5 prose-code:rounded-xs prose-code:text-white prose-code:my-0 prose-code:font-medium
          prose-blockquote:my-1 prose-blockquote:py-1
          prose-pre:bg-[oklch(0.205_0_0)] prose-code:in-prose-pre:bg-transparent prose-code:in-prose-pre:text-white prose-pre:my-2 prose-pre:w-max
          prose-a:text-blue-500 prose-a:underline prose-a:cursor-pointer prose-a:hover:no-underline
          prose-table:w-fit prose-th:px-2 prose-tr:py-1 prose-td:p-0 prose-table:border prose-td:border prose-th:border prose-table:**:border-black
        "
        >
          {toggleMd && edit && <MenuBar editor={editor} />}
          {toggleMd ? (
            <EditorContent editor={editor} />
          ) : (
            <Textarea
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
              className=" w-full font-mono text-sm min-h-[calc(100dvh-150px)]"
            />
          )}
        </div>


      </div>
    </section>
  );
}
