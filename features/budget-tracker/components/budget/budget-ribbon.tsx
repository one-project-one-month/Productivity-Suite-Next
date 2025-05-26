"use client";
import BudgetLayoutToggle from "@/features/budget-tracker/components/util/budget-layout-toggle";
import BudgetFilterGroup from "@/features/budget-tracker/components/util/budget-filter-group";

const BudgetRibbon = () => {
  return (
    <nav className={"md:flex justify-between items-center"}>
      <BudgetLayoutToggle />
      <BudgetFilterGroup />
    </nav>
  );
};

export default BudgetRibbon;
