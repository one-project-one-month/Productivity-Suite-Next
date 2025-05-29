import { Skeleton } from "@/components/ui/skeleton";
import SummaryCard from "@/features/budget-tracker/components/util/summary-card";

const BudgetDetailLoading = () => {
  return (
    <div>
      <Skeleton className={"mb-4 w-[150px] h-10"} />
      <div className={"md:flex justify-between items-start"}>
        <div className={"flex flex-col gap-y-2"}>
          <Skeleton className={"max-sm:w-[180px] w-[280px] h-8"} />
          <Skeleton className={"max-sm:w-[120px] h-6 w-[200px]"} />
          <Skeleton className={"w-[80px] h-6 md:w-[120px]"} />
        </div>
        <Skeleton className={"max-sm:w-full max-sm:mt-4 w-[150px] h-10"} />
      </div>
      <div
        className={
          "max-w-screen py-4 md:py-6 grid gap-y-4 md:grid-cols-2 gap-x-4 lg:grid-cols-4"
        }
      >
        <SummaryCard.Skeleton title={"Total Budget"} />
        <SummaryCard.Skeleton title={"Amount Spent"} />
        <SummaryCard.Skeleton title={"Remaining"} />
        <SummaryCard.Skeleton title={"Transactions"} />
      </div>
      <Skeleton className={"w-full h-46"} />
    </div>
  );
};

export default BudgetDetailLoading;
