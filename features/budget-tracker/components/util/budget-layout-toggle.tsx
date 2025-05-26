"use client";
import { Button } from "@/components/ui/button";
import { useLayoutStore } from "@/features/budget-tracker/hooks/use-layout-store";
import { LayoutGrid, List } from "lucide-react";

const BudgetLayoutToggle = () => {
  const setBudgetLayout = useLayoutStore((state) => state.setBudgetLayout);
  const layout = useLayoutStore((state) => state.budgetLayout);
  return (
    <div>
      <Button
        onClick={() => setBudgetLayout("LIST")}
        variant={layout === "LIST" ? "default" : "outline"}
      >
        <List />
        <span>List</span>
      </Button>
      <Button
        onClick={() => setBudgetLayout("TABLE")}
        className={"ml-2"}
        variant={layout === "TABLE" ? "default" : "outline"}
      >
        <LayoutGrid />
        <span>Table</span>
      </Button>
    </div>
  );
};

export default BudgetLayoutToggle;
