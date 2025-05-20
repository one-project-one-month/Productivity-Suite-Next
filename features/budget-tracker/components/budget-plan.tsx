type BudgetPlanProps = {
  data: {
    title: string;
    category: string | null;
    description: string | null;
    amount: number;
    spent: number;
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
        <h2 className={" text-lg font-semibold"}>{data.title}</h2>
        <p className={"mt-1 flex flex-col gap-y-0.5"}>
          <span className={"text-sm capitalize text-gray-500 md:text-base"}>
            {data.category}
          </span>
          <span className={"text-sm text-gray-500 md:text-base"}>
            {data.description}
          </span>
        </p>
      </div>
      <p className={"flex flex-col gap-y-1.5 text-right"}>
        <span className={"text-lg font-bold md:text-xl"}>
          ${data.spent}/${data.amount}
        </span>
        <span className={"text-sm text-gray-500 md:text-base"}>
          {percentSpent}% Used
        </span>
      </p>
    </article>
  );
};

export default BudgetPlan;
