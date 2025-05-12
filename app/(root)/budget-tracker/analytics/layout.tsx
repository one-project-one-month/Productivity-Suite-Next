import { ReactNode } from "react";

const BudgetAnalyticsPage = ({
  children,
  breakdown,
}: {
  children: ReactNode;
  breakdown: ReactNode;
}) => {
  return (
    <div className={"py-4 md:py-6 grid md:grid-cols-2 gap-4"}>
      {children}
      {breakdown}
    </div>
  );
};

export default BudgetAnalyticsPage;
