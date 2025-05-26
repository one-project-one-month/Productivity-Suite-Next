import SummaryCard from "@/features/budget-tracker/components/util/summary-card";

const BudgetOverviewLoading = () => {
  return (
    <>
      <SummaryCard.Skeleton title={"Total Budget"} />
      <SummaryCard.Skeleton title={"Total Spent"} />
      <SummaryCard.Skeleton title={"Remaining"} />
      <SummaryCard.Skeleton title={"Active Budget"} />
    </>
  );
};

export default BudgetOverviewLoading;
