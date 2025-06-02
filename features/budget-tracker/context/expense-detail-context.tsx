import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import { createContext, ReactNode, useContext } from "react";

const ExpenseDetailContext = createContext<IExpenseDetail[] | undefined>(
  undefined,
);

export const ExpenseDetailProvider = ({
  data,
  children,
}: {
  data: IExpenseDetail[];
  children: ReactNode;
}) => {
  return (
    <ExpenseDetailContext.Provider value={data}>
      {children}
    </ExpenseDetailContext.Provider>
  );
};

export const useExpenseDetail = (id: string) => {
  const context = useContext(ExpenseDetailContext);
  if (context === undefined) {
    throw new Error(
      "useExpenseDetail must be used inside ExpenseDetailProvider",
    );
  }
  return context.filter((expense) => expense.id === id)[0];
};
