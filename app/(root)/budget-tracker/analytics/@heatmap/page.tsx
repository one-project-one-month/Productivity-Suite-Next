import ExpenseHeatmap from "@/features/budget-tracker/components/chart/expense-heatmap";
import { getExpensesByDay } from "@/features/budget-tracker/actions/get-expenses-by-day";
import { notFound } from "next/navigation";
import { HEAT_MAP_COLORS } from "@/constants";

const ExpenseHeatmapSlot = async () => {
  const data = await getExpensesByDay();
  if (!data) {
    notFound();
  }

  return (
    <div
      className={
        "p-6  border rounded-xl shadow-md md:col-span-2 overflow-x-scroll"
      }
    >
      <h2 className={"font-bold text-2xl"}>Activity Heatmap</h2>
      <p className={"mb-4 text-gray-400 font-semibold"}>
        Your budget activity tracking over this year.
      </p>
      <div
        className={"mb-5 text-gray-500 md:flex items-center justify-between"}
      >
        <p>{data.length} actives days in this year</p>
        <div className={"flex items-center gap-x-2"}>
          <span className={"mr-3"}>Less</span>
          {HEAT_MAP_COLORS.map((color) => (
            <span
              key={color}
              className={`aspect-square h-4 md:6`}
              style={{ backgroundColor: color }}
              role={"presentation"}
            />
          ))}
          <span className={"ml-3"}>more</span>
        </div>
      </div>
      <div className={"w-full overflow-x-scroll"}>
        <ExpenseHeatmap data={data} />
      </div>
    </div>
  );
};

export default ExpenseHeatmapSlot;
