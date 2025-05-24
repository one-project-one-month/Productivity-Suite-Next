import { numFormatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import BudgetStatus from "@/features/budget-tracker/components/budget-status";
import { Progress } from "@/components/ui/progress";

type BudgetPlanProps = {
  data: {
    title: string;
    category: string | null;
    description: string | null;
    amount: number;
    spent: number;
    durationFrom: Date;
    durationTo: Date;
    color: string | null;
  };
};
const BudgetPlan = ({ data }: BudgetPlanProps) => {
  const percentSpent = Math.round((data.spent / data.amount) * 100);
  return (
    <article
      className={
        "py-4 flex justify-between items-start border-b-1 border-b-black/20"
      }
    >
      <div className={"max-sm:max-w-[55%]"}>
        <div className={"flex items-center gap-x-3"}>
          <h2 className={" text-lg font-semibold"}>{data.title}</h2>
          <BudgetStatus
            durationTo={data.durationTo}
            amount={data.amount}
            spent={data.spent}
            durationFrom={data.durationFrom}
          />
        </div>
        <p className={"mt-1 flex flex-col gap-y-0.5"}>
          <span className={"text-sm text-gray-500 md:text-base"}>
            {data.description}
          </span>
          <Badge
            className={"rounded-lg capitalize"}
            style={{
              background: data.color as string,
            }}
          >
            {data.category}
          </Badge>
        </p>
      </div>
      <div className={"flex flex-col gap-y-1.5 text-right"}>
        <span className={"text-lg font-bold "}>
          {numFormatter.format(data.spent ?? 0)} MMK &nbsp;/&nbsp;
          {numFormatter.format(data.amount)} MMK
        </span>
        {data.spent > data.amount ? (
          <Progress value={100} className={"*:bg-red-400"} />
        ) : (
          <Progress value={percentSpent} />
        )}
        <span className={"text-sm text-gray-500 md:text-base"}>
          {percentSpent}% Used
        </span>
      </div>
    </article>
  );
};

export default BudgetPlan;
