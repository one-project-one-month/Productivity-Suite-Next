import { formatDate, numFormatter } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, Dot } from "lucide-react";
import Link from "next/link";

type RecentExpenseProps = {
  title: string;
  budgetTitle: string | null;
  createdAt: Date;
  amount: number;
  category: string | null;
  categoryColor: string | null;
  budgetId: string;
};
const Expense = ({
  title,
  budgetTitle,
  amount,
  category,
  createdAt,
  categoryColor,
  budgetId,
}: RecentExpenseProps) => {
  return (
    <article
      className={"py-4 flex items-start justify-between capitalize border-b-1"}
    >
      <div>
        <div className={"flex items-center gap-x-4"}>
          <h1 className={"md:text-lg font-bold"}>{title}</h1>
          <Badge
            className={"rounded-lg"}
            style={{
              background: categoryColor || "black",
            }}
          >
            {category}
          </Badge>
        </div>

        <p
          className={"mt-2 flex items-center gap-x-2 font-medium text-gray-500"}
        >
          <span className={"flex items-center gap-x-2"}>
            <Calendar className={"size-4"} />
            <span>{formatDate(createdAt)}</span>
          </span>
          <Dot />
          <Link
            href={`/budget-tracker/budgets/${budgetId}`}
            className={
              "cursor-pointer border-b-1 border-b-transparent hover:border-b-black transition-colors duration-300"
            }
          >
            <span>{budgetTitle}</span>
          </Link>
        </p>
      </div>
      <p className={"text-lg font-bold"}>{numFormatter.format(amount)} MMK</p>
    </article>
  );
};

Expense.Skeleton = function ExpenseSkeleton() {
  return (
    <article
      className={
        "w-full py-4 flex items-start justify-between capitalize border-b-1"
      }
    >
      <div className={"w-full"}>
        <Skeleton className={"w-3/5 h-6"} />
        <div className={"w-2/5 text-gray-500"}>
          <Skeleton className={"mt-2 w-2/3 h-6"} />
          <Skeleton className={"mt-2 w-2/3 h-6"} />
        </div>
      </div>
      <div className={"w-full flex flex-col items-end gap-y-2"}>
        <Skeleton className={"w-2/5 h-6"} />
        <Skeleton className={"w-2/5 h-6"} />
      </div>
    </article>
  );
};

export default Expense;
