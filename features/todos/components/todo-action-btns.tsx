import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical, Trash } from "lucide-react";

const TodoActionBtns = () => {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={"link"} className={"p-0"}>
          <EllipsisVertical className={"md:size-6"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-fit"}>
        <Button variant={"destructive"}>
          <Trash />
          <span>Delete</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default TodoActionBtns;
