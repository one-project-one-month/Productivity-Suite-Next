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

export default function CategoryBreakdownChart() {
  const data = [
    { name: "Food", value: 595.5 },
    { name: "Housing", value: 350 },
    { name: "Transport", value: 250 },
    { name: "Leisure", value: 150 },
    { name: "Other", value: 100 },
  ];

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
              <span className="font-medium">{entry.value}</span>
            </div>
            <div>
              <span className="tabular-nums">${enhancedData[index].value}</span>
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
    return [`$${value} (${percentage}%)`, "Total Budget"];
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
      className="h-[400px]  md:h-[350px] lg:h-[300px] max-w-[300px] md:max-w-full "
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
