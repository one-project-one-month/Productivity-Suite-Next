import { createColumnHelper } from "@tanstack/table-core";
import { IBudgetDetail } from "@/features/budget-tracker/components/budget/budget-plan";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate, numFormatter } from "@/lib/utils";
import BudgetStatus from "../budget/budget-status";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<IBudgetDetail>();

export const budgetColumns = [
  columnHelper.accessor("title", {
    header: "Budget Plan",
    cell: ({ getValue, row }) => (
      <div className={"capitalize"}>
        <h2 className={"md:text-lg font-bold "}>
          <Link href={`/budget-tracker/budgets/${row.original.id}`}>
            {getValue()}
          </Link>
        </h2>
        <p className={"font-semibold text-sm text-gray-400"}>
          {row.original.description}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("categoryId", {
    header: "Category",
    cell: ({ row }) => (
      <Badge
        className={"rounded-xl capitalize text-sm px-3 py-1"}
        style={{ backgroundColor: row.original.categoryColor ?? "black" }}
      >
        {row.original.category}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const percentSpent = Math.round(
        (row.original.spent / row.original.amount) * 100,
      );
      return (
        <div className={"lg:mr-24"}>
          <p>{percentSpent}%</p>
          <Progress value={percentSpent} className={"max-w-[100px]"} />
        </div>
      );
    },
  }),
  columnHelper.accessor("spent", {
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <p className={"font-bold"}>
          {numFormatter.format(row.original.spent)} MMK
        </p>
        <p className={"text-gray-500"}>
          of {numFormatter.format(row.original.amount)} MMK
        </p>
      </div>
    ),
  }),
  columnHelper.display({
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <BudgetStatus
        durationTo={row.original.durationTo}
        durationFrom={row.original.durationFrom}
        spent={row.original.spent}
        amount={row.original.amount}
      />
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <p>{formatDate(getValue())}</p>,
  }),
];
