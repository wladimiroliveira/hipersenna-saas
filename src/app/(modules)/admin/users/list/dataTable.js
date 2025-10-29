"use client";

import * as React from "react";
import {
  columnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoveLeft, MoveRightIcon } from "lucide-react";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtre por nome..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto border-primaria text-primaria">
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-primaria">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                let headerLabel = column.columnDef.header;

                // 🔹 Se for função, tenta renderizar o conteúdo (sem causar erro)
                if (typeof headerLabel === "function") {
                  try {
                    const rendered = headerLabel({ column });

                    if (typeof rendered === "string") {
                      headerLabel = rendered;
                    } else if (React.isValidElement(rendered)) {
                      const children = rendered.props.children;

                      // se o children for um array (ex: [texto, ícone]), pega apenas o texto
                      if (Array.isArray(children)) {
                        headerLabel = children.find((child) => typeof child === "string") || column.id;
                      } else if (typeof children === "string") {
                        headerLabel = children;
                      } else {
                        headerLabel = column.id;
                      }
                    }
                  } catch {
                    headerLabel = column.id;
                  }
                }

                // 🔹 Se ainda for JSX simples (<div>Texto</div>)
                if (React.isValidElement(headerLabel)) {
                  const children = headerLabel.props.children;
                  if (typeof children === "string") {
                    headerLabel = children;
                  } else if (Array.isArray(children)) {
                    headerLabel = children.find((child) => typeof child === "string") || column.id;
                  } else {
                    headerLabel = column.id;
                  }
                }

                if (!headerLabel) headerLabel = column.id;

                if (React.isValidElement(headerLabel)) {
                  headerLabel = headerLabel.props;
                  children || column.id;
                }
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {headerLabel}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border border-primaria">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroupe) => (
              <TableRow key={headerGroupe.id} className="border-primaria">
                {headerGroupe.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-primaria">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-primaria">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center border-primaria">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          className="border-primaria text-primaria"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <MoveLeft className="text-primaria" />
          Anterior
        </Button>
        <Button
          variant="outline"
          className="border-primaria text-primaria"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Anterior
          <MoveRightIcon className="text-primaria" />
        </Button>
      </div>
    </div>
  );
}
