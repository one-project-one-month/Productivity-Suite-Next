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
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createOrUpdateTodo } from "../actions/todo-action";
import { useRouter } from "next/navigation";

type TodoFormProps = {
  isEdit: boolean;
  todo?: Partial<TodoSchema> & { id?: string | number };
  setOpen?: () => void;
};

export const TodoForm = ({ isEdit, todo, setOpen }: TodoFormProps) => {
  const router = useRouter();

  const defaultValues: TodoSchema = {
    id: todo?.id,
    title: todo?.title || "",
    description: todo?.description || "",
    priority: todo?.priority?.toString() ?? "1",
    dueAt: todo?.dueAt ? new Date(todo.dueAt) : new Date(),
  };

  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  });

  const { execute, status } = useAction(createOrUpdateTodo, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        form.reset();
        if (setOpen) setOpen();
        setTimeout(() => {
          router.push("/to-do");
        }, 100);
      }
    },
  });

  const onSubmit = (data: TodoSchema) => {
    const { id, title, description, priority, dueAt } = data;
    execute({ id, title, description, priority, dueAt });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Task title"
                  {...field}
                  className="bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
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
                <Textarea
                  placeholder="Optional task description"
                  {...field}
                  className="bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">High</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="3">Low</SelectItem>
                  </SelectContent>
                </Select>
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
                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-700" />
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
          className={cn(
            "w-full bg-blue-700 hover:bg-blue-500 text-white",
            status === "executing" && "animate-pulse",
          )}
        >
          {isEdit ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </Form>
  );
};
