import SummaryCard from "@/features/budget-tracker/components/summary-card";

const BudgetTrackerOverviewPage = () => {
  return (
    <>
      <SummaryCard
        title={"Total Budget"}
        data={"$4550"}
        description={"Across all category"}
      />
      <SummaryCard
        title={"Total Spent"}
        data={"$2345.5"}
        description={"51.5% of all Total Budget"}
      />
      <SummaryCard
        title={"Remaining"}
        data={"$2204.5"}
        description={"48.5% of all Total Budget"}
      />
      <SummaryCard
        title={"Active Budget"}
        data={"5"}
        description={"Across 3 categories"}
      />
    </>
  );
};

export default BudgetTrackerOverviewPage;
