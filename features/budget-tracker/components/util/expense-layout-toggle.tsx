"use client";
import { useLayoutStore } from "@/features/budget-tracker/hooks/use-layout-store";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

const ExpenseLayoutToggle = () => {
  const setExpenseLayout = useLayoutStore((state) => state.setExpenseLayout);
  const layout = useLayoutStore((state) => state.expenseLayout);
  return (
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
  );
};

export default ExpenseLayoutToggle;
