"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface BudgetOverviewChartData {
  name: string;
  budget: number;
  spent: number;
}

export default function BudgetOverviewChart({
  data,
}: {
  data: BudgetOverviewChartData[];
}) {
  return (
    <ChartContainer
      config={{
        budget: {
          label: "Budget",
          color: "#2a9d90",
        },
        spent: {
          label: "Spent",
          color: "#e76e50",
        },
      }}
      className="h-fit max-w-[300px] md:max-w-full "
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        aspect={16 / 9}
        minHeight={250}
        className={"max-w-[300px] md:max-w-full"}
      >
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={40} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="budget" fill="var(--color-budget)" />
          <Bar dataKey="spent" fill="var(--color-spent)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
