import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Todo } from "@/database/interfaces.types";
import { Calendar, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import PriorityBadge from "@/features/todos/components/priority-badge";
import TodoActionBtns from "@/features/todos/components/todo-action-btns";
import { isAfter } from "date-fns";

const TodoCard = ({ data }: { data: Todo }) => {
  return (
    <Card className={"w-full  gap-4 md:gap-6"}>
      <CardHeader className={"flex items-start justify-between"}>
        <h3>{data.title}</h3>
        <TodoActionBtns data={data} />
      </CardHeader>
      <CardContent>
        <p className={"mb-4"}>{data.description}</p>
        <div className={"flex items-center gap-2 md:gap-4 flex-wrap"}>
          {data.dueAt && (
            <Badge
              variant={
                isAfter(new Date(), data.dueAt) ? "destructive" : "secondary"
              }
              className={"mr-4 py-2 px-2 rounded-xl"}
            >
              <span>
                {isAfter(new Date(), data.dueAt) ? "OverDue: " : "Due: "}
              </span>
              <Calendar />
              <span>{formatDate(data.dueAt)}</span>
            </Badge>
          )}
          <PriorityBadge priority={data.priority}>
            <Star />
            <span className={"capitalize"}>
              {data.priority.toLowerCase()} Priority
            </span>
          </PriorityBadge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
