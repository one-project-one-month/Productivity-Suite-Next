import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import { useExpenseFilterStore } from "@/features/budget-tracker/hooks/use-expense-filter-store";

export const useFilteredExpenses = (payload: IExpenseDetail[]) => {
  let data = payload;
  const { searchString, category, budget } = useExpenseFilterStore();

  if (searchString && searchString !== "") {
    data = data.filter((item) =>
      item.title.toLowerCase().includes(searchString.toLowerCase()),
    );
  }
  if (category && category !== "all") {
    data = data.filter((item) => item.categoryId === category);
  }

  if (budget && budget !== "all") {
    data = data.filter((item) => item.budgetId === budget);
  }

  return data;
};
