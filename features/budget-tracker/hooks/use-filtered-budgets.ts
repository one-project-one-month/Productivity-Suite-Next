import { IBudgetDetail } from "@/features/budget-tracker/components/budget/budget-plan";
import { useBudgetFilterStore } from "@/features/budget-tracker/hooks/use-budget-filter-store";

export const useFilteredBudgets = (payload: IBudgetDetail[]) => {
  let data = payload;
  const { category, searchString } = useBudgetFilterStore();

  if (category && category !== "all") {
    data = data.filter((item) => item.categoryId === category);
  }

  if (searchString && searchString !== "") {
    data = data.filter((item) =>
      item.title.toLowerCase().includes(searchString.toLowerCase()),
    );
  }

  return data;
};
