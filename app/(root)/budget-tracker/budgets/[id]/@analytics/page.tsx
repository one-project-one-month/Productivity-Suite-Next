import DailySpendingTrend from "@/features/budget-tracker/components/chart/daily-spending-trend";
import { getDailySpendingTrends } from "@/features/budget-tracker/actions/get-daily-spending-trends";

const BudgetDetailAnalytics = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getDailySpendingTrends(id);
  return (
    <div className={"grid md:grid-cols-2 gap-4 md:gap-6"}>
      <DailySpendingTrend data={data ?? []} />
    </div>
  );
};

export default BudgetDetailAnalytics;
