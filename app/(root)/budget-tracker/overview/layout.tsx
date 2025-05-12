import { ReactNode } from "react";

const BudgetOverviewLayout = ({
  children,
  recent,
  chart,
}: {
  children: ReactNode;
  recent: ReactNode;
  chart: ReactNode;
}) => {
  return (
    <div
      className={
        "max-w-screen py-4 md:py-6 grid gap-y-4 md:grid-cols-2 gap-x-4 lg:grid-cols-4"
      }
    >
      {children}
      {chart}
      {recent}
    </div>
  );
};

export default BudgetOverviewLayout;
