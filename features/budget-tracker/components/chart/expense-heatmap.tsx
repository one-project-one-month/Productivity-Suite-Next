"use client";
import { ResponsiveCalendar } from "@nivo/calendar";
import { formatHeatmapDate } from "@/lib/utils";
import { addYears, set, subDays } from "date-fns";
import ExpenseHeatmapTooltip from "@/features/budget-tracker/components/chart/expense-heatmap-tooltip";
import { useTheme } from "next-themes";

interface ChartData {
  day: string;
  value: number;
}

const ExpenseHeatmap = ({ data }: { data: ChartData[] }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const lightColors = ["#d6e685", "#8cc665", "#44a340", "#1e6823"];
  const darkColors = ["#3e4c2b", "#4f6934", "#6b9943", "#a8cc7a"];
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
        emptyColor={isDark ? "#2d2d2d" : "#eeeeee"}
        colors={isDark ? darkColors : lightColors}
        tooltip={(data) => <ExpenseHeatmapTooltip {...data} />}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        yearSpacing={40}
        monthBorderColor={isDark ? "#444" : "#ffffff"}
        dayBorderWidth={2}
        dayBorderColor={isDark ? "#444" : "#ffffff"}
      />
    </div>
  );
};

export default ExpenseHeatmap;
