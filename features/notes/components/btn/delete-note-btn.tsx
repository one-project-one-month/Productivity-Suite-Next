"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteNote } from "../../actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useActionState, useState } from "react";
import { toast } from "sonner";

export default function DeleteNoteBtn({ noteId }: { noteId: string }) {
  const [open, setOpen] = useState(false);
  async function handleDelete(noteId: string) {
    deleteNote(noteId).then(() => {
      setOpen(false);
      toast.success("Deleted successfully!");
    });
  }
  const [state, formAction, isPending] = useActionState(
    () => handleDelete(noteId),
    null,
  );
  return (
    <div title={state || ""}>
      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="link"
            className="cursor-pointer z-10 hover:scale-105"
          >
            <TrashIcon className="text-destructive size-5 " />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete.</DialogTitle>
            <DialogDescription asChild>
              <div>
                <p>Deleted notes will be lost forever!</p>
                <div className="space-x-2 *:cursor-pointer mt-5">
                  <DialogClose asChild>
                    <Button size="sm" variant="secondary" disabled={isPending}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <form action={formAction} className="inline-block">
                    <Button
                      variant="destructive"
                      size="sm"
                      type="submit"
                      disabled={isPending}
                      className="cursor-pointer"
                    >
                      {isPending ? "Deleting" : "Delete"}
                    </Button>
                  </form>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
