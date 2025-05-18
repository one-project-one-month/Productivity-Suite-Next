import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import HelpContents from "./help-contents";
import { Info } from "lucide-react";

export default function Help() {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="cursor-pointer justify-start w-full"
          >
            <Info  />
            Show Md scripts
          </Button>
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
