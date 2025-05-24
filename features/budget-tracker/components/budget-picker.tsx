import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BudgetAndCurrency } from "./new-expense-form";

type BudgetPickerProps = {
  budgets: BudgetAndCurrency[];
  value: string;
  onChange: (value: string) => void;
};
const BudgetPicker = ({ budgets, value, onChange }: BudgetPickerProps) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={"USD"}>
      <SelectTrigger className={"w-full capitalize"}>
        <SelectValue placeholder="Select Budget" className={"capitalize"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Budgets</SelectLabel>
          {budgets.map((budget) => (
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
