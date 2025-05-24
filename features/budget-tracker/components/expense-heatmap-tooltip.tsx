import { CalendarTooltipProps } from "@nivo/calendar";
import { formatDate, numFormatter } from "@/lib/utils";

const ExpenseHeatmapTooltip = ({ day, value }: CalendarTooltipProps) => {
  return (
    <div className="min-w-[150px] rounded bg-white p-2 text-sm shadow">
      <div>
        <strong>{formatDate(day)}</strong>
      </div>
      <div>{numFormatter.format(value as unknown as number)} MMK</div>
    </div>
  );
};

export default ExpenseHeatmapTooltip;
