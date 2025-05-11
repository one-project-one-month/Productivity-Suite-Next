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

export default function BudgetOverviewChart() {
  const data = [
    {
      name: "Groceries",
      budget: 600,
      spent: 320,
    },
    {
      name: "Entertainment",
      budget: 200,
      spent: 150,
    },
    {
      name: "Utilities",
      budget: 350,
      spent: 350,
    },
    {
      name: "Dining Out",
      budget: 400,
      spent: 275.5,
    },
    {
      name: "Transport",
      budget: 300,
      spent: 250,
    },
  ];

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
