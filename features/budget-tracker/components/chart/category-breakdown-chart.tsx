"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { compactFormatter, numFormatter } from "@/lib/utils";

interface ChartData {
  name: string | null;
  value: number;
}

export default function CategoryBreakdownChart({
  data,
  categories,
}: {
  data: ChartData[];
  categories: Record<string, Record<string, string>>;
}) {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Enhanced data with percentages
  const enhancedData = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  // Custom legend renderer to match the app's styling
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 pt-4 text-sm">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`}>
            <div className={"flex items-center justify-center gap-x-2"}>
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium capitalize">{entry.value}</span>
            </div>
            <div>
              <span className="tabular-nums">
                {numFormatter.format(enhancedData[index].value as number)} MMK
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                ({enhancedData[index].percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Custom tooltip formatter to show percentage
  const tooltipFormatter = (value: number) => {
    const percentage = ((value / total) * 100).toFixed(1);
    return [
      `${compactFormatter.format(value)} MMK (${percentage}%)`,
      "Total Budget",
    ];
  };

  return (
    <ChartContainer
      config={{
        ...categories,
      }}
      className="h-[400px]  md:h-[350px] max-w-[300px] md:max-w-full "
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
            ))}
          </Pie>
          <Tooltip
            content={<ChartTooltipContent />}
            formatter={tooltipFormatter}
          />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
