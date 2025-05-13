import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type RecentExpenseProps = {
  title: string;
  budgetTitle: string;
  createdAt: Date;
  amount: number;
  category: string;
};
const Expense = ({
  title,
  budgetTitle,
  amount,
  category,
  createdAt,
}: RecentExpenseProps) => {
  return (
    <article
      className={"py-4 flex items-start justify-between capitalize border-b-1"}
    >
      <div>
        <h1 className={"text-lg font-bold"}>{title}</h1>
        <p className={"font-medium text-gray-500"}>
          <span>{formatDate(createdAt)}</span>
          <span className={"ml-4"}>{budgetTitle}</span>
        </p>
      </div>
      <div className={"text-right"}>
        <p className={"text-lg font-bold"}>${amount}</p>
        <p className={"font-medium text-gray-500"}>{category}</p>
      </div>
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
