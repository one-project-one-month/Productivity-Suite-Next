import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import DeleteNoteBtn from "./btn/delete-note-btn";
import { TNoteType } from "./note-types";
import HelpEditor from "./help/help-editor";
import { formatDistanceToNow } from "date-fns";
// import HelpEditor from "./help/help-editor";

export default function Note({
  id,
  title,
  body,
  createdAt,
  updatedAt,
}: TNoteType) {
  return (
    <div className="relative">
      <Link href={`/notes/${id}`} className="peer">
        <Card className="group space-y-0 hover:bg-yellow-300/10 h-full ">
          <CardHeader>
            <CardTitle className="flex justify-between relative">
              <p className="font-bold shrink-0 text-xl">{title}</p>
            </CardTitle>
            <CardDescription className="text-sm leading-3">
              {createdAt.toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <p>{body}</p> */}
            <HelpEditor body={body + "..." || ""} />
          </CardContent>
          <CardFooter className="my-0 mt-auto">
            <p className="text-right w-full text-sm text-muted-foreground">
              {updatedAt &&
                "Last Updated: " +
                  formatDistanceToNow(updatedAt, { addSuffix: true })}
            </p>
          </CardFooter>
        </Card>
      </Link>

      <div className="z-10 absolute right-5 top-5 cursor-pointer invisible peer-hover:visible hover:visible">
        <DeleteNoteBtn noteId={id} />
      </div>
    </div>
  );
}
