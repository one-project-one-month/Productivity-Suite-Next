"use client";
import { useLayoutStore } from "@/features/budget-tracker/hooks/use-layout-store";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import ExpenseList from "./expense-list";

const Expenses = ({ data }: { data: IExpenseDetail[] }) => {
  const layout = useLayoutStore((state) => state.expenseLayout);
  return layout === "LIST" ? (
    <ExpenseList data={data} />
  ) : (
    <div>Expense Table</div>
  );
};

export default Expenses;
