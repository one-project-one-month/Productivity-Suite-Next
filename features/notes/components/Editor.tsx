"use client";

import { EditorContent } from "@tiptap/react";
import MenuBar from "./menu";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCustomEditor } from "../hooks/use-custom-editor";
import TypoStyle from "./typo-style";
import Help from "./help/help-dialog";
import CancelBtn from "./btn/cancel-btn";
import { INoteType, TNoteType } from "./note-types";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { NOTE_CHARS_LIMIT } from "@/constants";
import { useBeforeUnload } from "../hooks/use-before-unload";
// import { getNoteContentById } from "../actions";

export default function Editor({
  data,
  mutate,
}: {
  data: TNoteType;
  mutate: (data: INoteType) => Promise<void>;
}) {
  const { id, title, body, createdAt, updatedAt } = data;

  const [toggleMd, setToggleMd] = useState(true);
  const [saved, setSaved] = useState(true);
  const [markdownText, setMarkdownText] = useState(body);
  const [titleText, setTitleText] = useState(title);

  const editor = useCustomEditor(body || "");

  // console.log(markdownText);

  useBeforeUnload(!saved);

  async function handleSave(data: TNoteType) {
    await mutate({
      ...data,
      title: titleText,
      body: markdownText,
      userId: "",
      updatedAt: new Date(),
    }).then(() => {
      setSaved(true);
      toast.success("Saved!");
    });
  }

  const [state, formAction, isPending] = useActionState(
    () => handleSave(data),
    null,
  );

  function handleCancel() {
    editor?.commands.setContent(body);
    setSaved(true);
  }

  useEffect(() => {
    if (!editor) return;

    const initialMarkdown = body;
    const handleUpdate = () => {
      const currentMarkdown = editor.storage.markdown.getMarkdown();
      setMarkdownText(currentMarkdown);
      setSaved(currentMarkdown === initialMarkdown);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, body]);

  // useEffect(() => {
  //   if (!editor) return;

  //   if (!toggleMd) {
  //     const md = editor.storage.markdown.getMarkdown();
  //     setMarkdownText(md);
  //   }
  // }, [toggleMd, editor]);

  function handleToggle() {
    if (!editor) return;

    if (!toggleMd) {
      editor.commands.setContent(markdownText);
    }
    setToggleMd((prev) => !prev);
  }

  const maxLimit =
    NOTE_CHARS_LIMIT - Number(editor?.storage.characterCount.characters());
  return (
    <section
      className="w-full p-1 min-h-[calc(100dvh-80px)]"
      title={state || ""}
    >
      <div className="w-full flex justify-between px-2 gap-2">
        <div title={id}>
          {/* <h1 className="text-2xl font-bold">{title}</h1> */}
          <form className="relative">
            <Input
              type="text"
              value={titleText}
              onChange={(e) => {
                setTitleText(e.target.value);
                setSaved(false);
              }}
              className="peer disabled:opacity-100 pl-1 field-sizing-content min-[540px]:max-w-64 max-w-32 sm:max-w-80 md:max-w-[480px] lg:max-w-[720px] pr-6 font-bold text-xl md:text-xl shadow-none outline-none border-0"
            />
            {!saved && (
              <Edit2 className="inline size-4 absolute top-2.5 right-1 peer-focus:hidden pointer-events-none " />
            )}
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

          {!saved && (
            <form action={formAction}>
              <Button
                type="submit"
                disabled={isPending}
                size="sm"
                className="cursor-pointer text-white bg-green-600 hover:bg-green-500"
              >
                <Save /> Save
              </Button>
            </form>
          )}

          {!saved && <CancelBtn handleCancel={handleCancel} />}
        </div>
      </div>

      <div className="">
        <p
          className="text-xs text-primary/50 pl-3 mb-0.5"
          title={new Date(createdAt).toString()}
        >
          Last Saved:{" "}
          {updatedAt && formatDistanceToNow(updatedAt, { addSuffix: true })}
          <span className="empty:hidden bg-red-500/20 select-none text-red-500 px-1 rounded-sm ml-1">
            {!saved && "not saved"}
          </span>
        </p>
      </div>

      <div>
        <TypoStyle>
          <div className="relative max-w-full min-h-[calc(100dvh-150px)] ">
            {toggleMd && !saved && <MenuBar editor={editor} />}
            {toggleMd ? (
              <EditorContent editor={editor} />
            ) : (
              <Textarea
                value={markdownText || ""}
                onChange={(e) => {
                  setMarkdownText(e.target.value);
                  setSaved(false);
                }}
                className=" w-full bg-muted font-mono text-sm min-h-[calc(100dvh-180px)]"
              />
            )}
            {!saved && <Help md={toggleMd} />}
          </div>
          <div className="w-full max-w-7xl bg-background text-foreground left-1/2 -translate-x-1/2 fixed bottom-0 z-10 text-right text-sm">
            <span className="">
              {editor?.storage.characterCount.characters().toLocaleString()}{" "}
              characters
            </span>
            <span className="mx-3">
              {editor?.storage.characterCount.words().toLocaleString()} words
            </span>
            <span className={`mx-3 ${!!!maxLimit && "text-destructive"}`}>
              {maxLimit.toLocaleString()} remaining
            </span>
          </div>
        </TypoStyle>
      </div>
    </section>
  );
}
