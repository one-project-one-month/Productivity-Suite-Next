import { getBudgetDetailsOverview } from "@/features/budget-tracker/actions/get-budget-details-overview";
import SummaryCard from "@/features/budget-tracker/components/util/summary-card";
import { cn, formatDate, numFormatter } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BudgetDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getBudgetDetailsOverview(id);
  if (!data) return notFound();
  const percentSpent = Math.round((data.amountSpent / data.totalBudget!) * 100);
  return (
    <div>
      <Button asChild={true} className={"mb-4"}>
        <Link href={"/budget-tracker/budgets"}>
          <ArrowLeft />
          Back to Budgets
        </Link>
      </Button>
      {/*Header*/}
      <header className={"md:flex justify-between items-start"}>
        <div>
          <h2 className={"font-bold text-2xl"}>{data.title}</h2>
          <p className={"mb-4 text-gray-500 "}>{data.description}</p>
          <p className={" mb-4 flex items-center gap-x-2 text-gray-500 "}>
            <Calendar /> Created {formatDate(data.createdAt!)}
            <Badge
              style={{
                background: data.categoryColor ?? "black",
              }}
              className={"rounded-lg capitalize"}
            >
              {data.category}
            </Badge>
          </p>
        </div>
        <Button asChild={true} className={"max-sm:w-full text-center"}>
          <Link href={"/budget-tracker/add-expense"}>
            <Plus />
            Add Expense
          </Link>
        </Button>
      </header>

      {/* Budget Summary Overview */}
      <div
        className={
          "max-w-screen py-4 md:py-6 grid gap-y-4 md:grid-cols-2 gap-x-4 lg:grid-cols-4"
        }
      >
        <SummaryCard
          title={"Total Budget"}
          data={numFormatter.format(data.totalBudget!)}
          description={"Monthly Allocation"}
        />
        <SummaryCard
          title={"Amount Spent"}
          data={numFormatter.format(data.amountSpent!)}
          description={`${percentSpent}% of Budget`}
        />
        <SummaryCard
          title={"Remaining"}
          data={numFormatter.format(data.totalBudget! - data.amountSpent!)}
          description={"Available to spend"}
        />
        <SummaryCard
          title={"Transactions"}
          data={numFormatter.format(data.numOfTransactions!)}
          description={"This month"}
        />
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <h2 className={"font-bold text-2xl"}>All Expenses</h2>
          <p className={"text-gray-500 "}>
            View and manage all your recorded expenses.
          </p>
        </CardHeader>
        <CardContent>
          <p className={"mb-2 flex items-center justify-between"}>
            <span>Progress</span>
            <span>{percentSpent}%</span>
          </p>
          <Progress
            value={percentSpent}
            className={cn("mb-4", percentSpent >= 100 && "*:bg-red-500")}
          />
          <hr />
          <div
            className={
              "pt-4 flex items-center justify-center gap-x-4 md:gap-x-8 lg:gap-x-56"
            }
          >
            <p className={"flex flex-col gap-y-1"}>
              <span className={"font-bold text-lg text-green-500 md:text-xl"}>
                {numFormatter.format(data.averageSpent!)} MMK
              </span>
              <span className={"text-sm md:text-base text-gray-400"}>
                Avg per transaction
              </span>
            </p>
            <p className={"flex flex-col gap-y-1"}>
              <span className={"font-bold text-lg text-blue-500 md:text-xl"}>
                {numFormatter.format(data.largestTransaction!)} MMK
              </span>
              <span className={"text-sm md:text-base text-gray-400"}>
                Largest Expense
              </span>
            </p>
            <p className={"flex flex-col gap-y-1"}>
              <span className={"font-bold text-lg text-rose-500 md:text-xl"}>
                {data.numOfTransactions}
              </span>
              <span className={"text-sm md:text-base text-gray-400"}>
                Total transactions
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetDetailPage;
