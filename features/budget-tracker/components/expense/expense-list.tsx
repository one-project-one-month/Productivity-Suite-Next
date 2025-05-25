"use client";
import ExpenseCard, {
  IExpenseDetail,
} from "@/features/budget-tracker/components/expense/expense-card";
import ExpenseRibbon from "./expense-ribbon";
import { useFilteredExpenses } from "@/features/budget-tracker/hooks/use-filtered-expenses";

type ExpenseListProps = {
  data: IExpenseDetail[];
};
const ExpenseList = ({ data }: ExpenseListProps) => {
  const processedData = useFilteredExpenses(data);
  return (
    <>
      <ExpenseRibbon />
      <div
        className={
          "mt-4 max-h-[50vh] md:max-h-[65vh] lg:max-h-[50vh] overflow-y-scroll pr-4"
        }
      >
        {processedData.map((expense, idx) => (
          <ExpenseCard
            {...expense}
            budgetId={expense.budgetId as string}
            key={idx}
          />
        ))}
      </div>
    </>
  );
};

export default ExpenseList;
