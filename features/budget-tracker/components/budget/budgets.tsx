"use client";
import { IBudgetDetail } from "@/features/budget-tracker/components/budget/budget-plan";
import BudgetList from "@/features/budget-tracker/components/budget/budget-list";
import BudgetTable from "@/features/budget-tracker/components/tables/budget-table";
import { useLayoutStore } from "../../hooks/use-layout-store";

const Budgets = ({ data }: { data: IBudgetDetail[] }) => {
  const layout = useLayoutStore((state) => state.expenseLayout);
  return layout === "LIST" ? (
    <BudgetList data={data} />
  ) : (
    <BudgetTable data={data} />
  );
};

export default Budgets;
