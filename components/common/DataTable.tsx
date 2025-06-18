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
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filterColumn, setFilterColumn] = useState<string | undefined>();
  const [filterValue, setFilterValue] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {},
    initialState: {
      columnVisibility: {
        id: false,
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
    </div>
  );
}
