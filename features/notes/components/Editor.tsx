"use client";

import { EditorContent } from "@tiptap/react";
import MenuBar from "./menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCustomEditor } from "../hooks/use-custom-editor";
import TypoStyle from "./typo-style";
import Help from "./help/help-dialog";
import CancelBtn from "./cancel-btn";

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

  function handleCancel() {
    editor?.commands.setContent(body);
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
      <div className="w-full flex justify-between px-2 gap-2">
        <div className=" ">
          {/* <h1 className="text-2xl font-bold">{title}</h1> */}
          <form className="relative">
            <Input type="text" defaultValue={title} disabled={saved} className="peer disabled:opacity-100 pl-1 field-sizing-content min-[540px]:max-w-64 max-w-32 sm:max-w-80 md:max-w-[480px] lg:max-w-[720px] pr-6 font-bold text-xl md:text-xl shadow-none outline-none border-0" />
            {!saved && <Edit2 className="inline size-4 absolute top-2.5 right-1 peer-focus:hidden pointer-events-none " />}
          </form>
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

          {!saved && <Button disabled={saved} onClick={handleSave} size="sm" className="cursor-pointer text-white bg-green-600 hover:bg-green-500">
            <Save /> Save
          </Button>}

          {!saved && <CancelBtn handleCancel={handleCancel} />}
        </div>
      </div>

      <div className="">
        <p className="text-xs text-primary/50 pl-3 mb-0.5" title={createdAt.toString()}>
            Last Saved: {updatedAt.toLocaleDateString()}
            <span className="empty:hidden bg-red-500/20 select-none text-red-500 px-1 rounded-sm ml-1">{!saved && "not saved"}</span>
          </p>
      </div>

      <div>
        <TypoStyle>
          <div className="relative max-w-full min-h-[calc(100dvh-150px)] ">
            {toggleMd && !saved && <MenuBar editor={editor} />}
            {toggleMd ?
              <EditorContent editor={editor} />
              :
              <Textarea
                value={markdownText}
                onChange={(e) => {setMarkdownText(e.target.value); setSaved(false);}}
                className=" w-full bg-muted font-mono text-sm min-h-[calc(100dvh-180px)]"
              />
            }
            {!saved && <Help md={toggleMd} />
            }
          </div>
          <div className="w-full max-w-7xl bg-background text-foreground left-1/2 -translate-x-1/2 fixed bottom-0 z-10 text-right text-sm">
            <span className="">{editor?.storage.characterCount.characters()} characters</span>
            <span className="mx-3">{editor?.storage.characterCount.words()} words</span>
            <span className="mx-3">{2048 - Number(editor?.storage.characterCount.characters()) || 0} remaining</span>
          </div>
        </TypoStyle>

      </div>
    </section>
  );
}
