"use client";
import { Button } from "@/components/ui/button";
import { useLayoutStore } from "@/features/budget-tracker/hooks/use-layout-store";
import { LayoutGrid, List } from "lucide-react";
import ExpenseFilterGroup from "@/features/budget-tracker/components/util/expense-filter-group";

const ExpenseRibbon = () => {
  const setExpenseLayout = useLayoutStore((state) => state.setExpenseLayout);
  const layout = useLayoutStore((state) => state.expenseLayout);
  return (
    <nav className={"md:flex justify-between items-center"}>
      <div>
        <Button
          onClick={() => setExpenseLayout("LIST")}
          variant={layout === "LIST" ? "default" : "outline"}
        >
          <List />
          <span>List</span>
        </Button>
        <Button
          onClick={() => setExpenseLayout("TABLE")}
          className={"ml-2"}
          variant={layout === "TABLE" ? "default" : "outline"}
        >
          <LayoutGrid />
          <span>Table</span>
        </Button>
      </div>
      <ExpenseFilterGroup />
    </nav>
  );
};

export default ExpenseRibbon;
