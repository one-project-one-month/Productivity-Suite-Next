"use client";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface IDailySpendingChart {
  cumulativeAmount: number;
  amount: number;
  day: Date;
  totalSpent: number;
}

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useTheme } from "next-themes";

const DailySpendingTrend = ({ data }: { data: IDailySpendingChart[] }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <Card className={"mt-4 md:col-span-2"}>
      <CardHeader>
        <CardTitle>Daily Spending Trend</CardTitle>
        <CardDescription>
          Your spending pattern over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            amount: {
              label: "Daily Amount",
              color: "hsl(var(--chart-1))",
            },
            cumulativeAmount: {
              label: "Cumulative",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={isDark ? "#aaa" : "blue"}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="cumulativeAmount"
                stroke={isDark ? "chocolate" : "gray"}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DailySpendingTrend;
