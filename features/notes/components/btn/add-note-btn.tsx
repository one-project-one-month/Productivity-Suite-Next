"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useActionState } from "react";
import { addNoteAction } from "../../actions/server-actions";

export default function AddNoteBtn({ userId }: { userId: string }) {
  const [state, formAction, pending] = useActionState(
    () => addNoteAction(userId),
    null,
  );

  return (
    <form action={formAction} title={state || ""}>
      <Button
        disabled={pending}
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
      >
        <Plus className={`${pending && "animate-spin"}`} /> New Note
      </Button>
    </form>
  );
}
