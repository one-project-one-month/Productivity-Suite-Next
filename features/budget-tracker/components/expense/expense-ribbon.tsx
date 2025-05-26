"use client";
import ExpenseFilterGroup from "@/features/budget-tracker/components/util/expense-filter-group";
import ExpenseLayoutToggle from "../util/expense-layout-toggle";

const ExpenseRibbon = () => {
  return (
    <nav className={"md:flex justify-between items-center"}>
      <ExpenseLayoutToggle />
      <ExpenseFilterGroup />
    </nav>
  );
};

export default ExpenseRibbon;
