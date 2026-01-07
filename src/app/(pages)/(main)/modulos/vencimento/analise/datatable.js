"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
import {
  BadgeInfoIcon,
  Columns3Icon,
  DownloadIcon,
  Fullscreen,
  MaximizeIcon,
  MinimizeIcon,
  MoveLeft,
  MoveRightIcon,
} from "lucide-react";
import clsx from "clsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DataTable({ columns, data, searchColumn, downloadTable, downloadable }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [downloadState, setDownloadState] = React.useState(downloadable ? true : false);
  const [fullScreen, setFullScreen] = React.useState(false);

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

  function handleFullScreen() {
    console.log(fullScreen);
    setFullScreen(fullScreen ? false : true);
  }

  return (
    <div
      className={clsx("transition-all", {
        "absolute top-15 left-0 w-full h-full p-4 backdrop-blur-sm bg-secundaria": fullScreen,
      })}
    >
      <div className="flex justify-between w-full py-4">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className={clsx("cursor-pointer", {
              hidden: downloadState === false,
              flex: downloadState === true,
            })}
            onClick={downloadTable}
          >
            <DownloadIcon />
            Baixar Planilha
          </Button>
          <Input
            placeholder={`Filtre por descrição...`}
            value={table.getColumn(searchColumn)?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
            className="w-md"
          />
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <BadgeInfoIcon /> Tratativas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="w-xs">
                <Card className="shadow-none border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BadgeInfoIcon size="20" /> Tratativas
                    </CardTitle>
                    <CardDescription>
                      Confira os Id`&apos;`s de todas as tratativas disponíveis no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>1 - Pendente</li>
                      <li>2 - Colocar em promoção</li>
                      <li>3 - Troca com o fornecedor</li>
                      <li>4 - Transferência interna</li>
                      <li>5 - Bloqueio para venda</li>
                      <li>6 - Doação</li>
                      <li>7 - Vencido</li>
                      <li>8 - Produto vendável dentro do prazo</li>
                      <li>9 - Inserção tardia</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto text-primaria">
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
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" className="cursor-pointer" onClick={handleFullScreen}>
                {fullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{fullScreen ? "Minimizar" : "Tela Cheia"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
            <SelectTrigger className="text-primaria">
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
          <Button
            variant="outline"
            className="text-primaria"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <MoveLeft className="text-primaria" />
            Anterior
          </Button>

          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>

          <Button
            variant="outline"
            className="text-primaria"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
            <MoveRightIcon className="text-primaria" />
          </Button>
        </div>
      </div>
    </div>
  );
}
