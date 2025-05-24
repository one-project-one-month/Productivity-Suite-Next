import { Skeleton } from "@/components/ui/skeleton";

const BudgetBreakdownLoading = () => {
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Category Breakdown</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Spending by category for the current month
      </p>
      <Skeleton className={"w-full h-[350px]"} />
    </div>
  );
};

export default BudgetBreakdownLoading;
