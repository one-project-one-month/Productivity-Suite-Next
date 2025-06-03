"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Todo } from "@/database/interfaces.types";
import TodoList from "@/features/todos/components/todo-list";
import { useTodoFilterStore } from "@/features/todos/hooks/use-todo-filter-store";
import PriorityFilter from "@/features/todos/components/priority-filter";

const Todos = ({ data }: { data: Todo[] }) => {
  const { priority } = useTodoFilterStore();
  return (
    <div className={"flex justify-between items-start"}>
      <Tabs defaultValue={"all"}>
        <TabsList>
          <TabsTrigger value={"all"}>All</TabsTrigger>
          <TabsTrigger value={"active"}>Active</TabsTrigger>
          <TabsTrigger value={"completed"}>Completed</TabsTrigger>
        </TabsList>
        <TabsContent value={"all"}>
          <TodoList data={data} />
        </TabsContent>
        <TabsContent value={"active"}>
          <TodoList data={data} />
        </TabsContent>
        <TabsContent value={"completed"}>
          <TodoList data={data} />
        </TabsContent>
      </Tabs>
      <div>
        <PriorityFilter />
      </div>
    </div>
  );
};

export default Todos;
