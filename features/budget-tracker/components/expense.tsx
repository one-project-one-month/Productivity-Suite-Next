import { formatDate } from "@/lib/utils";

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

export default Expense;
