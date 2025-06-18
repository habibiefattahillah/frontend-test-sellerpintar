"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  setPage: (page: number) => void;
  total: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  setPage,
  total,
}: DataTableProps<TData, TValue>) {
  const [filterColumn, setFilterColumn] = useState<string | undefined>();
  const [filterValue, setFilterValue] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {},
    initialState: {
      columnVisibility: {
        id: false,
      },
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const selectedColumn = table
    .getAllColumns()
    .find((col) => col.id === filterColumn);

  useEffect(() => {
    if (selectedColumn && selectedColumn.getCanFilter()) {
      selectedColumn.setFilterValue(filterValue);
    }
  }, [selectedColumn, filterValue]);

  const pageIndex = table.getState().pagination?.pageIndex ?? 0;
  const pageCount = Math.ceil(total / 10);

  let pageNumbers: (number | string)[] = [];
  if (pageCount > 0) {
    if (pageIndex > 0) {
      pageNumbers.push(pageIndex);
    }
    pageNumbers.push(pageIndex + 1);
    if (pageIndex < pageCount - 1) {
      pageNumbers.push("...");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 px-6">
        <Select onValueChange={(value) => setFilterColumn(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            {table.getAllColumns().map((col) =>
              col.getCanFilter() && col.id !== "id" ? (
                <SelectItem key={col.id} value={col.id}>
                  {typeof col.columnDef.header === "string"
                    ? col.columnDef.header
                    : col.id}
                </SelectItem>
              ) : null
            )}
          </SelectContent>
        </Select>

        <Input
          placeholder={
            filterColumn ? `Filter by ${filterColumn}` : "Select a column"
          }
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
          disabled={!filterColumn}
        />

        <Button
          className="ml-auto"
          onClick={() => {
            alert("Add Article clicked!");
          }}
        >
          <PlusIcon className="h-4 w-4" />
          Add Article
        </Button>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-6 font-semibold text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div
        id="pagination"
        className="sticky bottom-0 bg-white py-2 flex items-center justify-center gap-2 shadow z-10"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          {"< previous"}
        </Button>

        {Array.from({ length: 3 }).map((_, i) => {
          let pageNumber = page;
          if (page <= 1) pageNumber = i + 1;
          else if (page >= pageCount) pageNumber = pageCount - 2 + i;
          else pageNumber = page - 1 + i;

          if (pageNumber < 1 || pageNumber > pageCount) return null;

          return (
            <Button
              key={pageNumber}
              variant={pageNumber === page ? "outline" : "ghost"}
              size="sm"
              className={
                pageNumber === page ? "border border-primary font-bold" : ""
              }
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page >= pageCount}
        >
          {"next >"}
        </Button>
      </div>
    </div>
  );
}
