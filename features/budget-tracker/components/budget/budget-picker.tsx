import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllBudgets } from "@/features/budget-tracker/hooks/use-all-budgets";

type BudgetPickerProps = {
  value: string;
  onChange: (value: string) => void;
};
const BudgetPicker = ({ value, onChange }: BudgetPickerProps) => {
  const { data, isLoading } = useAllBudgets();
  return (
    <Select value={value} onValueChange={onChange} defaultValue={"USD"}>
      <SelectTrigger className={"w-full capitalize"} disabled={isLoading}>
        <SelectValue placeholder="Select Budget" className={"capitalize"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Budgets</SelectLabel>
          {data &&
            data.map((budget) => (
              <SelectItem
                value={budget.id}
                key={budget.id}
                className={"capitalize"}
              >
                {budget.title}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BudgetPicker;
