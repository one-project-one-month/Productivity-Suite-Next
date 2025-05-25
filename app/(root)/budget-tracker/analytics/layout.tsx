import { ReactNode } from "react";

const BudgetAnalyticsPage = ({
  children,
  breakdown,
  heatmap,
}: {
  children: ReactNode;
  breakdown: ReactNode;
  heatmap: ReactNode;
}) => {
  return (
    <div className={"py-4 md:py-6 grid md:grid-cols-2 gap-4"}>
      {heatmap}
      {children}
      {breakdown}
    </div>
  );
};

export default BudgetAnalyticsPage;
