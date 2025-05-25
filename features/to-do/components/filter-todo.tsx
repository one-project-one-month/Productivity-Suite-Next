"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown01 } from "lucide-react";

type FilterTodoProps = {
  onChange: (value: string) => void;
  value: string;
};

const FilterTodo = ({ onChange, value }: FilterTodoProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="flex items-center justify-center gap-3 border-blue-700   font-bold bg-white dark:bg-gray-800 dark:border-blue-700 text-foreground dark:text-white">
        <ArrowDown01 className="w-6 h-6 text-blue-700" />
        <SelectValue placeholder="Filter by priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="1">High</SelectItem>
        <SelectItem value="2">Medium</SelectItem>
        <SelectItem value="3">Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterTodo;
