"use client";
import { ResponsiveCalendar } from "@nivo/calendar";
import { formatHeatmapDate } from "@/lib/utils";
import { addYears, set, subDays } from "date-fns";
import ExpenseHeatmapTooltip from "@/features/budget-tracker/components/expense-heatmap-tooltip";

interface ChartData {
  day: string;
  value: number;
}

const ExpenseHeatmap = ({ data }: { data: ChartData[] }) => {
  const from = formatHeatmapDate(
    set(new Date(), {
      date: 1,
      month: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }),
  );
  const to = formatHeatmapDate(subDays(addYears(from, 1), 1));
  return (
    <div className={"h-[300px] min-w-[500px]"}>
      <ResponsiveCalendar
        data={data}
        from={from}
        to={to}
        emptyColor="#eeeeee"
        tooltip={(data) => <ExpenseHeatmapTooltip {...data} />}
        colors={["#d6e685", "#8cc665", "#44a340", "#1e6823"]}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  );
};

export default ExpenseHeatmap;
