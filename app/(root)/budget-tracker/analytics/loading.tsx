import { Skeleton } from "@/components/ui/skeleton";

const BudgetAnalyticsLoading = () => {
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Monthly Spending</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your spending trends over the past 6 months
      </p>
      <Skeleton className={"w-full h-[350px]"} />
    </div>
  );
};

export default BudgetAnalyticsLoading;
