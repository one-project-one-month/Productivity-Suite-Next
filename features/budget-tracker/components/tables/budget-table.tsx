"use client";
import { IBudgetDetail } from "@/features/budget-tracker/components/budget/budget-plan";
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
import { budgetColumns } from "@/features/budget-tracker/components/tables/budget-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BudgetLayoutToggle from "@/features/budget-tracker/components/util/budget-layout-toggle";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import InputFilter from "@/features/budget-tracker/components/util/input-filter";
import CategoryFilter from "@/features/budget-tracker/components/util/category-filter";

const BudgetTable = ({ data }: { data: IBudgetDetail[] }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns: budgetColumns,
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
        <BudgetLayoutToggle />
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
                colSpan={budgetColumns.length}
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

export default BudgetTable;
