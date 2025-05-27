import { ReactNode } from "react";

const BudgetDetailLayout = ({
  children,
  expense,
}: {
  children: ReactNode;
  expense: ReactNode;
}) => {
  return (
    <>
      {children}
      {expense}
    </>
  );
};

export default BudgetDetailLayout;
