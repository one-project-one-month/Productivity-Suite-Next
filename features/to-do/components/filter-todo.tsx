"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown01 } from "lucide-react";

type FilterTodoProps = {
    onChange: (value: string) => void;
    value: string;
};

const FilterTodo = ({ onChange, value }: FilterTodoProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="flex items-center justify-center gap-3 text-black font-bold">
                <ArrowDown01 className="w-6 h-6" />
                <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default FilterTodo;

