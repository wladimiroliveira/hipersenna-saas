"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidElement, useState } from "react";
import { SendIcon, TrashIcon } from "lucide-react";
import clsx from "clsx";

export function DataTable({ columns, data, handleRemoveRows }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  function removeRows() {
    const selectedRowsIndex = table.getFilteredSelectedRowModel().rows.map((row) => {
      return row.index;
    });
    handleRemoveRows(selectedRowsIndex);
  }

  return (
    <div className="w-full">
      <h2 className="text-base font-medium">Produtos Inseridos</h2>
      <div className="flex h-full flex-col gap-2">
        <div className="flex justify-between itens-center">
          <Input
            placeholder="Filtrar por descrição..."
            value={table.getColumn("description")?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto text-primaria">
                Colunas
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
                      } else if (isValidElement(rendered)) {
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
                  if (isValidElement(headerLabel)) {
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
                  if (isValidElement(headerLabel)) {
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
        <div className="overflow-hidden h-full rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-end space-x-2 pb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <span className="text-sm">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Próximo
            </Button>
          </div>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="destructive"
              className={clsx("cursor-pointer", {
                "opacity-0 scale-95": table.getFilteredSelectedRowModel().rows.length === 0,
                "opacity-100 scale-100": table.getFilteredSelectedRowModel().rows.length > 0,
              })}
              onClick={removeRows}
            >
              Excluir {table.getFilteredSelectedRowModel().rows.length} linha
              {table.getFilteredSelectedRowModel().rows.length > 1 && "s"} <TrashIcon />
            </Button>
            <Button size="sm" disabled={data?.length === 0} className="cursor-pointer bg-green-600 hover:bg-green-700">
              Enviar
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
