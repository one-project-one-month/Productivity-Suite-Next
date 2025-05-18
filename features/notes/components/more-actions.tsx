"use client";

import { Button } from "@/components/ui/button";
import { Download, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Editor} from "@tiptap/react";
import Help from "./help/help-dialog";


export default function MoreActions({editor, title}: {editor:Editor | null, title:string}) {
  function exportMd() {
    if (!editor) return;

    const md = editor.storage.markdown.getMarkdown();
    const blob = new Blob([md], {type: "text/markdown"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = title+".md";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="!px-1 cursor-pointer">
         <EllipsisVertical />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>Export as</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={exportMd}>
           <Download /> Download .md
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Help  />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
