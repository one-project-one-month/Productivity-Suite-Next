"use client";
import { IExpenseDetail } from "@/features/budget-tracker/components/expense/expense-card";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { expenseColumns } from "@/features/budget-tracker/components/tables/expense-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseLayoutToggle from "@/features/budget-tracker/components/util/expense-layout-toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CategoryFilter from "@/features/budget-tracker/components/util/category-filter";
import BudgetFilter from "@/features/budget-tracker/components/util/budget-filter";
import InputFilter from "../util/input-filter";

const ExpenseTable = ({ data }: { data: IExpenseDetail[] }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns: expenseColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
  });

  return (
    <div>
      <div className={"mb-4 md:flex justify-between items-center"}>
        <ExpenseLayoutToggle />
        <div className={"max-sm:mt-4 flex items-center gap-2 flex-wrap"}>
          <InputFilter
            /*@ts-expect-error this function is so right*/
            onChange={table.getColumn("title")?.setFilterValue}
          />
          <CategoryFilter
            /*@ts-expect-error this function is so right*/
            onChange={table.getColumn("categoryId")?.setFilterValue}
            varient={"table"}
          />
          <BudgetFilter
            /*@ts-expect-error this function is so right*/
            onChange={table.getColumn("budgetId")?.setFilterValue}
            varient={"table"}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={expenseColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default ExpenseTable;
