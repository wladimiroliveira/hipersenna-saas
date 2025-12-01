"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "validity_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID Validade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("validity_id");
      return <div className="pl-7">{value}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div>Inserido em</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));

      if (isNaN(date.getTime())) return "-";

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "numeric",
        year: "numeric",
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "request_id",
    header: "ID Requisição",
  },
  {
    accessorKey: "employee_id",
    header: "ID Colaborador",
  },
  {
    accessorKey: "prod_id",
    header: "ID Produto",
  },
  {
    accessorKey: "product_cod",
    header: "COD Produto",
  },
  {
    accessorKey: "auxiliary_code",
    header: "COD Barras",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Quant.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("quantity");
      return <span className="block text-center">{value}</span>;
    },
  },
  {
    accessorKey: "validity_date",
    header: () => <div>Data de Validade</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("validity_date"));

      if (isNaN(date.getTime())) return "-";

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "numeric",
        year: "numeric",
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "treat_id",
    header: "Tratamendo",
  },
];
