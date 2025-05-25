"use client";
import { useAllCategories } from "@/features/budget-tracker/hooks/use-all-categories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type CategoryFilterProps = {
  onChange: (value: string) => void;
};
const CategoryFilter = ({ onChange }: CategoryFilterProps) => {
  const { data, isLoading } = useAllCategories();
  if (isLoading) {
    return <Skeleton className={"w-[150px]  h-10"} />;
  }
  return (
    <Select disabled={isLoading} defaultValue={"all"} onValueChange={onChange}>
      <SelectTrigger className={"max-w-[200px] capitalize py-5"}>
        <SelectValue placeholder={"Filter By Category"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"all"}>All Categories</SelectItem>
          {data &&
            data.map((item) => (
              <SelectItem
                value={item.id}
                key={item.id}
                className={"capitalize"}
              >
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
