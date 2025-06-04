import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical, Trash } from "lucide-react";
import { Todo } from "@/database/interfaces.types";
import TodoDeleteBtn from "@/features/todos/components/todo-delete-btn";

const TodoActionBtns = ({ data }: { data: Todo }) => {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={"link"} className={"p-0"}>
          <EllipsisVertical className={"md:size-6"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-fit"}>
        <TodoDeleteBtn id={data.id} />
      </PopoverContent>
    </Popover>
  );
};

export default TodoActionBtns;
