import CategoryFilter from "@/features/budget-tracker/components/util/category-filter";
import ExpenseFilter from "@/features/budget-tracker/components/util/expense-filter";
import BudgetFilter from "@/features/budget-tracker/components/util/budget-filter";
import { useExpenseFilterStore } from "@/features/budget-tracker/hooks/use-expense-filter-store";

const ExpenseFilterGroup = () => {
  const setSearchString = useExpenseFilterStore(
    (state) => state.setSearchString,
  );
  const setCategory = useExpenseFilterStore((state) => state.setCategory);
  const setBudget = useExpenseFilterStore((state) => state.setBudget);
  return (
    <div className={"max-sm:mt-4 flex items-center gap-x-4"}>
      <ExpenseFilter onChange={setSearchString} />
      <CategoryFilter onChange={setCategory} />
      <BudgetFilter onChange={setBudget} />
    </div>
  );
};

export default ExpenseFilterGroup;
