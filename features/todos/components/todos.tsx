"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Todo } from "@/database/interfaces.types";
import TodoList from "@/features/todos/components/todo-list";

const Todos = ({ data }: { data: Todo[] }) => {
  return (
    <div>
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
    </div>
  );
};

export default Todos;
