"use client";

import { EditorContent } from "@tiptap/react";
import MenuBar from "./menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Info, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCustomEditor } from "../hooks/use-custom-editor";
import TypoStyle from "./typo-style";

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

  const [toggleMd, setToggleMd] = useState(true);
  const [saved, setSaved] = useState(true);
  const [markdownText, setMarkdownText] = useState(body);

  const editor = useCustomEditor(body);

  function handleSave() {
    setSaved(true);
  }

  useEffect(() => {
    if (!editor) return;

    const initialMarkdown = body;
    const handleUpdate = () => {
      const currentMarkdown = editor.storage.markdown.getMarkdown();
      setSaved(currentMarkdown === initialMarkdown);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, body]);


  useEffect(() => {
    if (!editor) return;

    if (!toggleMd) {
      const md = editor.storage.markdown.getMarkdown();
      setMarkdownText(md);
    }
  }, [toggleMd, editor]);


  function handleToggle() {
    if (!editor) return;

    if (!toggleMd) {
      editor.commands.setContent(markdownText);
    }

    setToggleMd((prev) => !prev);
  };

  return (
    <section className="w-full p-1 min-h-[calc(100dvh-80px)]">
      <div className="w-full mb-1 flex justify-between px-2 gap-2">
        <div className=" ">
          {/* <h1 className="text-2xl font-bold">{title}</h1> */}
          <form className="relative">
            <Input type="text" defaultValue={title} className="peer font-bold text-2xl md:text-3xl" />
            <Edit2 className="inline size-4 absolute top-2.5 right-1 peer-focus:hidden pointer-events-none" />
          </form>
          <p className="text-xs text-primary/50 font-medium pl-2 mt-1" title={createdAt.toString()}>
            Last Saved: {updatedAt.toLocaleDateString()}
            <span className="empty:hidden bg-red-500/20 select-none text-red-500 px-1 rounded-sm ml-1">{!saved && "not saved"}</span>
          </p>
        </div>

        <div className="space-x-1 shrink-0 flex">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleToggle}
            className="cursor-pointer hover:bg-muted-foreground/20"
          >
            {toggleMd ? "Markdown" : "Rich Text"}
          </Button>

          <Button disabled={saved} onClick={handleSave} size="sm" className="cursor-pointer bg-green-600 hover:bg-green-500">
            <Save /> Save
          </Button>

          <Button size="sm" variant="destructive" className="cursor-pointer" disabled={saved}>
            Cancel
          </Button>
        </div>
      </div>

      <div>
        <TypoStyle>
          <div className="relative max-w-full min-h-[calc(100dvh-180px)] ">
            {toggleMd && !saved && <MenuBar editor={editor} />}
            {toggleMd ?
              <EditorContent editor={editor} />
              :
              <Textarea
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
                className=" w-full bg-muted font-mono text-sm min-h-[calc(100dvh-180px)]"
              />
            }
            {!saved && <div className="absolute top-13 right-1">
              <Button size="sm" variant="outline" className="size-7 rounded-full hover:shadow-md cursor-pointer"><Info /></Button>
            </div>}
          </div>
          <div className="w-full bg-muted-foreground/20">
           { editor?.storage.characterCount.characters()} characters {editor?.storage.characterCount.words()} words
          </div>
        </TypoStyle>

      </div>
    </section>
  );
}
