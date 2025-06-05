import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { Todo } from "@/database/interfaces.types";
import TodoDeleteBtn from "@/features/todos/components/todo-delete-btn";
import CompleteBtn from "@/features/todos/components/complete-btn";
import UpdateTodoDialog from "@/features/todos/components/update-todo-dialog";

const TodoActionBtns = ({ data }: { data: Todo }) => {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild={true}>
        <Button variant={"link"} className={"p-0"}>
          <EllipsisVertical className={"md:size-6"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-fit flex flex-col gap-y-4"}>
        {!data.completedAt && <CompleteBtn id={data.id} />}
        <TodoDeleteBtn id={data.id} />
        <UpdateTodoDialog defaultValues={data} />
      </PopoverContent>
    </Popover>
  );
};

export default TodoActionBtns;
