"use client";
import { useLayoutStore } from "@/features/budget-tracker/hooks/use-layout-store";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import ExpenseList from "./expense-list";
import ExpenseTable from "@/features/budget-tracker/components/tables/expense-table";
import { ExpenseDetailProvider } from "@/features/budget-tracker/context/expense-detail-context";

const Expenses = ({ data }: { data: IExpenseDetail[] }) => {
  const layout = useLayoutStore((state) => state.expenseLayout);
  return layout === "LIST" ? (
    <ExpenseDetailProvider data={data}>
      <ExpenseList data={data} />
    </ExpenseDetailProvider>
  ) : (
    <ExpenseDetailProvider data={data}>
      <ExpenseTable data={data} />
    </ExpenseDetailProvider>
  );
};

export default Expenses;
