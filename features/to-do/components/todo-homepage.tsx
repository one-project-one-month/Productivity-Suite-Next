"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodoTable from "@/features/to-do/components/todo-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilterTodo from "@/features/to-do/components/filter-todo";
import CreateDialogForm from "@/features/to-do/components/create-dialog-form";
import { TodoSchema } from "@/features/to-do/types/todo-schema";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import FilterStatus from "./filter-status";

// sample data
// const sampleTodos: TodoSchema[] = Array.from({ length: 50 }, (_, i) => ({
//   id: (i + 1).toString(),
//   title: `Task ${i + 1}`,
//   description: `This is the description for task ${i + 1}`,
//   dueAt: new Date("2025-05-20T10:00:00Z"),
//   status: i % 3 === 0 ? "PENDING" : i % 3 === 1 ? "COMPLETE" : "OVERDUE",
//   priority: ((i % 3) + 1).toString(),
// }));

const ITEMS_PER_PAGE = 5;

type todoProps = {
  todos: TodoSchema[];
};

const TodoHomePage = ({ todos }: todoProps) => {
  // for filter priority
  const [priorityFilter, setPriorityFilter] = useState("all");

  // filter status
  const [statusFilter, setStatusFilter] = useState("All");

  // const filteredTodos = priorityFilter === "all" ? todos : todos.filter((todo) => todo.priority === priorityFilter);

  const filteredTodos = todos.filter((todo) => {
    const matchPriority =
      priorityFilter === "all" || todo.priority === priorityFilter;
    const matchStatus = statusFilter === "All" || todo.status === statusFilter;
    return matchPriority && matchStatus;
  });

  // for pagination
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const paginatedTodos = filteredTodos.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <Card className=" text-black">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground dark:text-white">
              TODOLISTS
            </CardTitle>
            <CardDescription>View your All todos</CardDescription>
          </div>
          <CreateDialogForm />
        </div>
        <div className="flex items-center justify-between mt-4">
          <FilterStatus
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setPage(0);
            }}
          />
          <FilterTodo
            value={priorityFilter}
            onChange={(val) => {
              setPriorityFilter(val);
              setPage(0); // reset page when filter changes
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <TodoTable todos={paginatedTodos} page={page} />
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        {filteredTodos.length === 0 ? (
          <span className="text-muted-foreground flex items-center gap-2">
            <span className="flex items-center text-sm">
              <ChevronLeft className="w-4 h-4" />
              Pre
            </span>
            <span className="px-3 py-1 text-sm border rounded">0</span>
            <span className="flex items-center text-sm">
              Next
              <ChevronRight className="w-4 h-4" />
            </span>
          </span>
        ) : (
          <ReactPaginate
            previousLabel={
              <span className="flex items-center mr-1 text-blue-700">
                <ChevronLeft className="w-4 h-4" />
                Pre
              </span>
            }
            nextLabel={
              <span className="flex items-center ml-1 text-blue-700">
                Next
                <ChevronRight className="w-4 h-4" />
              </span>
            }
            pageCount={pageCount}
            onPageChange={({ selected }) => setPage(selected)}
            forcePage={page}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            containerClassName="flex gap-1 items-center"
            pageClassName=""
            pageLinkClassName="px-3 py-1 text-sm border rounded hover:bg-muted hover:text-red-600 hover:!bg-gray-300 text-blue-500"
            activeLinkClassName="bg-primary text-primary-foreground"
            previousClassName=""
            nextClassName=""
            previousLinkClassName="px-3 py-1 text-sm border rounded hover:bg-gray-300 pointer-cursor"
            nextLinkClassName="px-3 py-1 text-sm border rounded hover:bg-gray-300 pointer-cursor"
            breakLabel="..."
            breakClassName="px-2 text-black"
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default TodoHomePage;
