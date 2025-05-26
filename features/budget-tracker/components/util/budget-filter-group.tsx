"use client";
import { useBudgetFilterStore } from "@/features/budget-tracker/hooks/use-budget-filter-store";
import InputFilter from "@/features/budget-tracker/components/util/input-filter";
import CategoryFilter from "@/features/budget-tracker/components/util/category-filter";

const BudgetFilterGroup = () => {
  const setSearchString = useBudgetFilterStore(
    (state) => state.setSearchString,
  );
  const setCategory = useBudgetFilterStore((state) => state.setCategory);
  return (
    <div className={"max-sm:mt-4 flex items-center gap-2 flex-wrap md:gap-4"}>
      <InputFilter
        onChange={setSearchString}
        placeholder={"Search Budget..."}
      />
      <CategoryFilter onChange={setCategory} />
    </div>
  );
};

export default BudgetFilterGroup;
