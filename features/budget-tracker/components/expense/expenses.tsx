"use client";
import { useLayoutStore } from "@/features/budget-tracker/hooks/use-layout-store";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import ExpenseList from "./expense-list";
import ExpenseTable from "@/features/budget-tracker/tables/expense-table";

const Expenses = ({ data }: { data: IExpenseDetail[] }) => {
  const layout = useLayoutStore((state) => state.expenseLayout);
  return layout === "LIST" ? (
    <ExpenseList data={data} />
  ) : (
    <ExpenseTable data={data} />
  );
};

export default Expenses;
