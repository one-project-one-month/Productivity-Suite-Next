"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { linkSchema, TLinkSchema } from "../note-types";


export default function LinkOption({ editor }: { editor: Editor | null }) {
  const [open, setOpen] = useState(false);

  const{register, handleSubmit, formState:{errors}, setValue,resetField} = useForm({resolver: zodResolver(linkSchema)});

  const isTextSelected = editor?.state?.selection?.empty === false;

  useEffect(() => {
    if (open && editor) {
      // const { from, to } = editor.state.selection;
      const existingLink = editor.getAttributes("link")?.href;
      setValue("url", existingLink);
    }
  }, [open, editor, setValue]);


  const submitLink = (data:TLinkSchema) => {
    if (!editor) return;
    // console.log(data);
    const {to} = editor.state.selection;

      editor.chain().focus().extendMarkRange("link").setLink({ href: data.url, target: "_blank" }).setTextSelection(to).run();
      setOpen(false);
      resetField("url");
  };

  if (!editor) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          disabled={!isTextSelected}
          title="Add Link"
        >
          <LinkIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription asChild>
            <form onSubmit={handleSubmit(submitLink)} className="space-y-2">
              <label htmlFor="url" className="block w-full text-left font-medium leading-7">
                Url
                <span className="text-red-500 ml-2">{errors.url?.message}</span>
                <Input
                  {...register("url")}
                  type="url"
                  placeholder="https://www.example.com"
                />
              </label>
              <Button type="submit" className="w-full">
                Add Link
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
