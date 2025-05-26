"use client";
import { useAllBudgets } from "@/features/budget-tracker/hooks/use-all-budgets";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BudgetFilterProps = {
  onChange: (value: string) => void;
  varient?: "list" | "table";
};
const BudgetFilter = ({ onChange, varient = "list" }: BudgetFilterProps) => {
  const { data, isLoading } = useAllBudgets();
  if (isLoading) {
    return <Skeleton className={"w-[150px]  h-10"} />;
  }
  return (
    <Select
      disabled={isLoading}
      defaultValue={varient === "list" ? "all" : undefined}
      onValueChange={onChange}
    >
      <SelectTrigger className={"max-w-[200px] capitalize py-5"}>
        <SelectValue placeholder={"Filter By Budget"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {varient === "list" && (
            <SelectItem value={"all"}>All Budgets</SelectItem>
          )}
          {data &&
            data.map((item) => (
              <SelectItem
                value={item.id}
                key={item.id}
                className={"capitalize"}
              >
                {item.title}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BudgetFilter;
