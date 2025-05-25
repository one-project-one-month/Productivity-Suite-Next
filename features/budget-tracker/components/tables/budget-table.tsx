import { IBudgetDetail } from "@/features/budget-tracker/components/budget/budget-plan";

const BudgetTable = ({ data }: { data: IBudgetDetail[] }) => {
  console.log(data);
  return <div>BudgetTable</div>;
};

export default BudgetTable;
