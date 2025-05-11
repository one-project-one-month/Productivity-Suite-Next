import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import HelpContents from "./help-contents";

export default function Help({md}: {md:boolean}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute right-1" style={{top: md? "50px" : "5px"}}>
          <Button size="sm" variant="outline" className="size-7 rounded-full hover:shadow-md cursor-pointer"><Info /></Button>
        </div>
      </DialogTrigger>
      <DialogContent className="min-h-[calc(100dvh-200px)] overflow-auto max-h-[120px] max-w-6xl! w-[calc(100%-50px)]">
        <DialogHeader>
          <DialogTitle>Markdown Scripts</DialogTitle>
          <DialogDescription asChild>
            <HelpContents />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
