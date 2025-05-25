import { createColumnHelper } from "@tanstack/table-core";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate, numFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<IExpenseDetail>();

export const expenseColumns = [
  columnHelper.accessor("title", {
    header: "Expense",
    cell: ({ getValue, row }) => (
      <div className={"capitalize"}>
        <h2 className={"md:text-lg font-bold "}>{getValue()}</h2>
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
  columnHelper.accessor("budgetId", {
    header: "Budget Plan",
    cell: ({ row }) => (
      <Link href={`/budget-tracker/budgets/${row.original.budgetId}`}>
        {row.original.budgetTitle}
      </Link>
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
  columnHelper.accessor("amount", {
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <p>{numFormatter.format(getValue())} MMK</p>,
  }),
];
