import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "lucide-react";

export default function Note({title, body, createdAt, updatedAt}: {title: string, body: string, createdAt: Date, updatedAt: Date}) {
  return (
    <Card className="group space-y-0 gap-1 hover:bg-yellow-300/10 h-full ">
      <CardHeader>
        <CardTitle className="flex justify-between">
         <p className="font-bold shrink-0 text-xl">{title}</p>
         <div className="">
          <TrashIcon className="text-red-500 size-5 hover:scale-105 invisible group-hover:visible" />
         </div>
        </CardTitle>
        <CardDescription className="text-sm leading-3">
          {createdAt.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter className="my-0 ">
        <p className="text-right w-full text-sm text-muted-foreground">Last Updated: {updatedAt.toLocaleDateString()}</p>
      </CardFooter>
    </Card>

  );
}
