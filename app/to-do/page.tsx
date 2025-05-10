"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import TodoTable from "@/features/to-do/components/todo-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilterTodo from "@/features/to-do/components/filter-todo";
import CreateDialogForm from "@/features/to-do/components/create-dialog-form";
import { TodoSchema } from "@/features/to-do/types/todo-schema";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export type DisplayTodo = TodoSchema & {
    status: "PENDING" | "COMPLETED" | "OVERDUE";
};

// sample data
const sampleTodos: DisplayTodo[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    description: `This is the description for task ${i + 1}`,
    dueAt: new Date("2025-05-20T10:00:00Z"),
    status: i % 3 === 0 ? "PENDING" : i % 3 === 1 ? "COMPLETED" : "OVERDUE",
    priority: ((i % 3) + 1).toString() as "1" | "2" | "3",
}));

// const sampleTodos: DisplayTodo[] = []

const ITEMS_PER_PAGE = 5;

export default function TodoPage() {
    // for filter
    const [priorityFilter, setPriorityFilter] = useState("all");
    const filteredTodos = priorityFilter === "all"
        ? sampleTodos
        : sampleTodos.filter(todo => todo.priority === priorityFilter);

    // for pagination
    const [page, setPage] = useState(0);
    const pageCount = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
    const paginatedTodos = filteredTodos.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return (
        <Card className=" text-black">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>ToDoLists</CardTitle>
                        <CardDescription>View your All tasks</CardDescription>
                    </div>
                    <CreateDialogForm />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <FilterTodo value={priorityFilter} onChange={(val) => {
                        setPriorityFilter(val);
                        setPage(0); // reset page when filter changes
                    }} />
                </div>
            </CardHeader>
            <CardContent>
                <TodoTable todos={paginatedTodos} />
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                {filteredTodos.length === 0 ? (
                    <span className="text-muted-foreground flex items-center gap-2">
                        <span className="flex items-center">
                            <ChevronLeft className="w-4 h-4" />
                            Pre
                        </span>
                        <span className="px-3 py-1 text-sm border rounded">0</span>
                        <span className="flex items-center">
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </span>
                    </span>
                ) : (
                    <ReactPaginate
                        previousLabel={
                            <span className="flex items-center gap-1">
                                <ChevronLeft className="w-4 h-4" />
                                Pre
                            </span>
                        }
                        nextLabel={
                            <span className="flex items-center gap-1">
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
                        pageLinkClassName="px-3 py-1 text-sm border rounded hover:bg-muted hover:text-red-600 text-blue-500"
                        activeLinkClassName="bg-primary text-primary-foreground"
                        previousClassName=""
                        nextClassName=""
                        previousLinkClassName="px-3 py-1 text-sm border rounded hover:bg-muted"
                        nextLinkClassName="px-3 py-1 text-sm border rounded hover:bg-muted"
                        breakLabel="..."
                        breakClassName="px-2 text-black"
                    />
                )}
            </CardFooter>

        </Card>
    );
}
