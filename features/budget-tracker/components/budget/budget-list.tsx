import BudgetPlan, {
  IBudgetDetail,
} from "@/features/budget-tracker/components/budget/budget-plan";
import BudgetRibbon from "@/features/budget-tracker/components/budget/budget-ribbon";
import { useFilteredBudgets } from "@/features/budget-tracker/hooks/use-filtered-budgets";

const BudgetList = ({ data }: { data: IBudgetDetail[] }) => {
  const processedData = useFilteredBudgets(data);
  return (
    <>
      <BudgetRibbon />
      <div
        className={
          "max-h-[50vh] md:max-h-[65vh] lg:max-h-[50vh] overflow-y-scroll pr-4"
        }
      >
        {processedData.map((budget, idx) => (
          <BudgetPlan data={budget} key={idx} />
        ))}
      </div>
    </>
  );
};

export default BudgetList;
