import { Skeleton } from "@/components/ui/skeleton";

const BudgetOverviewChartLoadingPage = () => {
  return (
    <div
      className={
        "md:col-span-2 p-6  border rounded-xl shadow-md bg-card text-card-foreground"
      }
    >
      <h2 className={"font-bold text-2xl"}>Budget Overview</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget plan and spending for the current month
      </p>
      <Skeleton className={"min-w-[350px] h-[250px]"} />
    </div>
  );
};

export default BudgetOverviewChartLoadingPage;
