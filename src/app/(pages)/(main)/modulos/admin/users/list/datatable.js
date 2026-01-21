"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as React from "react";
import {
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
import { Columns3Icon, DownloadIcon, MoveLeft, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import clsx from "clsx";
import { CreateUserModal } from "@/components/views/userList.view";

export function DataTable({ columns, data, searchColumn, downloadTable, downloadable }) {
  const [sorting, setSorting] = React.useState([{ id: "id", desc: false }]);
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

  React.useEffect(() => {
    table.setPageSize(10);
  }, [table]);

  return (
    <div>
      <div className="flex items-center gap-4 py-4">
        <CreateUserModal />
        <Input
          placeholder={`Filtre por nome...`}
          value={table.getColumn(searchColumn)?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto  text-primaria">
              Colunas
              <Columns3Icon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
      <div className="overflow-hidden rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroupe) => (
              <TableRow key={headerGroupe.id}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center ">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
        {/* 🔹 Seletor de tamanho de página */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Linhas por página:</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[80px]  text-primaria focus:ring-primaria">
              <SelectValue placeholder="Qtd" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 🔹 Controles de paginação */}
        <div className="flex items-center space-x-2">
          <Button size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <MoveLeftIcon />
            Anterior
          </Button>

          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>

          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próxima
            <MoveRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
