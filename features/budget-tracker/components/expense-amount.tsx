import { Input } from "@/components/ui/input";
import { Control, useWatch } from "react-hook-form";
import { TNewExpenseSchema } from "@/database/validators";
import { BudgetAndCurrency } from "@/features/budget-tracker/components/new-expense-form";

type ExpenseAmountProps = {
  value: number;
  onChange: (value: number) => void;
  control: Control<TNewExpenseSchema>;
  budgets: BudgetAndCurrency[];
};
const ExpenseAmount = ({
  value,
  onChange,
  control,
  budgets,
}: ExpenseAmountProps) => {
  const activeBudget = useWatch({
    control,
    name: "budgetId",
  });
  const activeCurrency = budgets.filter(
    (budget) => budget.id === activeBudget,
  )[0].currency;
  return (
    <div className={"flex justify-center items-baseline gap-x-4"}>
      <Input
        placeholder={"0.00"}
        value={value}
        type={"number"}
        onChange={(evt) => onChange(Number.parseInt(evt.target.value))}
      />
      <Input disabled={true} value={activeCurrency} className={"w-[80px]"} />
    </div>
  );
};

export default ExpenseAmount;
