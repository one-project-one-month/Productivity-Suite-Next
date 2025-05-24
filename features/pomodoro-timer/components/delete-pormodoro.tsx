"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDeleteSequence } from "../hooks/use-delete-sequence";

export default function DeletePomodoro({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteSequence();
  // async function handleDelete(id: string) {
  //   deletePomodoro(id).then(() => {
  //     setOpen(false);
  //     toast.success("Deleted successfully!");
  //   });
  // }
  // const [state, formAction, isPending] = useActionState(
  //   () => handleDelete(id),
  //   null,
  // );
  return (
    <div>
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
                <p>All of its sequence will be deleted!</p>
                <div className="space-x-2 *:cursor-pointer mt-5">
                  <DialogClose asChild>
                    <Button size="sm" variant="secondary" disabled={isPending}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    size="sm"
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer"
                    onClick={async () => {
                      mutateAsync(id);
                      setOpen(false);
                    }}
                  >
                    {isPending ? "Deleting" : "Delete"}
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
