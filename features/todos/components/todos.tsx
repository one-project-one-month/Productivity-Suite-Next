"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Todo } from "@/database/interfaces.types";
import TodoList from "@/features/todos/components/todo-list";
import PriorityFilter from "@/features/todos/components/priority-filter";

const Todos = ({ data }: { data: Todo[] }) => {
  return (
    <Tabs defaultValue={"all"} className={"w-full"}>
      <div
        className={"mb-4 flex items-center justify-between flex-wrap gap-y-4"}
      >
        <TabsList className={"w-fit"}>
          <TabsTrigger value={"all"}>All</TabsTrigger>
          <TabsTrigger value={"active"}>Active</TabsTrigger>
          <TabsTrigger value={"completed"}>Completed</TabsTrigger>
          <TabsTrigger value={"overdue"}>Over Due</TabsTrigger>
        </TabsList>
        <PriorityFilter />
      </div>
      <TabsContent value={"all"}>
        <TodoList data={data} type={"all"} />
      </TabsContent>
      <TabsContent value={"active"}>
        <TodoList data={data} type={"active"} />
      </TabsContent>
      <TabsContent value={"completed"}>
        <TodoList data={data} type={"completed"} />
      </TabsContent>
      <TabsContent value={"overdue"}>
        <TodoList data={data} type={"overdue"} />
      </TabsContent>
    </Tabs>
  );
};

export default Todos;
