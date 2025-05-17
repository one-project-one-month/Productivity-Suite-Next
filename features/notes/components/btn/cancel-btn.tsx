"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function CancelBtn({
  handleCancel,
}: {
  handleCancel: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" className="cursor-pointer">
          Discard
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you don&apos;t want to save?</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p className="">
                Your changes will be lost if you don&apos;t save them.
              </p>
              <div className="space-x-2 *:cursor-pointer mt-5">
                <DialogClose asChild>
                  <Button size="sm" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>

                <Button size="sm" variant="destructive" onClick={handleCancel}>
                  Don&apos;t save
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
