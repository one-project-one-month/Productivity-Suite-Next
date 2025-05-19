import Expense from "@/features/budget-tracker/components/expense";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRecentExpenses } from "@/features/budget-tracker/actions/get-recent-expenses";
import { notFound } from "next/navigation";

const RecentTransactionPage = async () => {
  const data = await getRecentExpenses();
  if (!data) {
    return notFound();
  }
  return (
    <div className={"md:col-span-2 p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-bold text-2xl"}>Budget Overview</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget plan and spending for the current month
      </p>
      <div className={"lg:max-h-[300px] overflow-y-scroll lg:px-4"}>
        {data.map((item, idx) => (
          <Expense {...item} key={idx} />
        ))}
      </div>
      <Button asChild={true} variant={"outline"} className={"mt-4"}>
        <Link href={"/budget-tracker/expenses"}>View All Expenses</Link>
      </Button>
    </div>
  );
};

export default RecentTransactionPage;
