"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { todoSchema, TodoSchema } from "../types/todo-schema";
import { useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createOrUpdateTodo } from "../actions/todo-action";
import { useRouter } from "next/navigation";

type TodoFormProps = {
  isEdit: boolean;
  todo?: Partial<TodoSchema> & { id?: string | number };
};

export const TodoForm = ({ isEdit, todo }: TodoFormProps) => {
  const router = useRouter();

  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      id: undefined,
      title: "",
      description: "",
      priority: "1",
      dueAt: new Date(),
    },
  });

  useEffect(() => {
    console.log("Resetting form with todo:", todo);
    if (isEdit && todo) {
      form.reset({
        id: todo.id,
        title: todo.title || "",
        description: todo.description || "",
        priority: todo.priority?.toString() ?? "1",
        dueAt: todo.dueAt ? new Date(todo.dueAt) : new Date(),
      });
    }
  }, [todo, isEdit]);

  const { execute, status, result } = useAction(createOrUpdateTodo, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        form.reset();
        router.push("/to-do");
      }
    },
  });

  const onSubmit = (data: TodoSchema) => {
    const { id, title, description, priority, dueAt } = data;
    execute({ id, title, description, priority, dueAt });
    console.log("Data are", data);
    // Data are {title: 'Go to School', description: '9am on the morning', priority: '1', dueAt: Sun May 11 2025 15:26:19 GMT+0630 (Myanmar Time)}
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Optional task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            name="priority"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="dueAt"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "max-w-xl justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value.toLocaleDateString()}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={status === "executing"}
          className={cn("w-full", status === "executing" && "animate-pulse")}
        >
          {isEdit ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </Form>
  );
};
