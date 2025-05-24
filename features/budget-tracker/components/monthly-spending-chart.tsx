"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { compactFormatter } from "@/lib/utils";

interface ChartData {
  [key: string]: string | number;
}

export default function MonthlySpendingChart({ data }: { data: ChartData[] }) {
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground capitalize">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ChartContainer
      config={{
        Food: {
          label: "Food",
          color: "#2a9d90",
        },
        Housing: {
          label: "Housing",
          color: "#e76e50",
        },
        Transport: {
          label: "Transport",
          color: "#247754",
        },
        Leisure: {
          label: "Leisure",
          color: "#e8c468",
        },
        Other: {
          label: "Other",
          color: "#f4a462",
        },
      }}
      className="h-[300px] max-w-[300px] md:max-w-[95%] md:mx-auto "
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: "0.75rem" }}
            tickMargin={8}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            width={40}
            tick={{ fontSize: "0.75rem" }}
            tickMargin={8}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${compactFormatter.format(value)}`}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={renderLegend} className={"capitalize"} />
          <Line
            type="monotone"
            dataKey="food"
            stroke="#2a9d90"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="housing"
            stroke="#e76e50"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="transport"
            stroke="#247754"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="leisure"
            stroke="#e8c478"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="other"
            stroke="#f4a462"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
