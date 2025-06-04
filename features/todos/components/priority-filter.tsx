import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TodoPriority } from "@/database/enums";
import { useTodoFilterStore } from "@/features/todos/hooks/use-todo-filter-store";

const PriorityFilter = () => {
  const onFilterChange = useTodoFilterStore((state) => state.setPriority);
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className={"max-w-[200px] min-w-[160px] capitalize py-4"}>
        <SelectValue placeholder={"Filter By Priority"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>All Priority</SelectItem>
        {TodoPriority.enumValues.map((item, idx) => (
          <SelectItem value={item} key={idx}>
            <span className={"capitalize"}>{item.toLowerCase()}</span>
            <span>Priority</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PriorityFilter;
