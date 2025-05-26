import { Button } from "@/components/ui/button";
import ExpenseCard from "@/features/budget-tracker/components/expense/expense-card";

const BudgetOverviewRecentLoading = () => {
  return (
    <div className={"md:col-span-2 p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Budget Overview</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget plan and spending for the current month
      </p>
      <div className={"lg:max-h-[300px] overflow-y-scroll lg:px-4"}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <ExpenseCard.Skeleton key={idx} />
        ))}
      </div>
      <Button
        variant={"outline"}
        className={"mt-4 cursor-pointer"}
        disabled={true}
      >
        View All Expenses
      </Button>
    </div>
  );
};

export default BudgetOverviewRecentLoading;
