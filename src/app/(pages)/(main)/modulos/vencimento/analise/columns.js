"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "validity_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Id da Validade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("product_id");
      return <div className="pl-7">{value}</div>;
    },
  },
  {
    accessorKey: "product_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("product_id");
      return <div className="pl-7">{value}</div>;
    },
  },
  {
    accessorKey: "request_id",
    header: "Id Requisição",
    cell: ({ row }) => {
      const value = row.getValue("request_id");

      return <span className="block text-center">{value ? value : "---"}</span>;
    },
  },
  {
    accessorKey: "employee_id",
    header: "Id Colaborador",
    cell: ({ row }) => {
      const value = row.getValue("employee_id");

      return <span className="block text-center">{value}</span>;
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
    accessorKey: "product_code",
    header: "Cod Produto",
    cell: ({ row }) => {
      const value = row.getValue("product_code");

      return <span className="block text-center">{value ? value : "---"}</span>;
    },
  },
  {
    accessorKey: "auxiliary_code",
    header: "Cod Barras",
    cell: ({ row }) => {
      const value = row.getValue("auxiliary_code");

      return <span className="block text-center">{value ? value : "---"}</span>;
    },
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
    accessorKey: "department_id",
    header: "Depart",
    cell: ({ row }) => {
      const value = row.getValue("department_id");

      return <span className="block text-center">{value}</span>;
    },
  },
  {
    accessorKey: "supplier_id",
    header: "Id Fornec",
    cell: ({ row }) => {
      const value = row.getValue("supplier_id");

      return <span className="block text-center">{value}</span>;
    },
  },
  {
    accessorKey: "supplier_name",
    header: "Nome Fornec",
    cell: ({ row }) => {
      const value = row.getValue("supplier_name");

      return <span className="block text-center">{value}</span>;
    },
  },
  {
    accessorKey: "buyer_id",
    header: "Id Comprador",
    cell: ({ row }) => {
      const value = row.getValue("buyer_id");

      return <span className="block text-center">{value}</span>;
    },
  },
  {
    accessorKey: "buyer_name",
    header: "Nome Comprador",
    cell: ({ row }) => {
      const value = row.getValue("buyer_name");

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

      return <span className="block text-center">{formattedDate}</span>;
    },
  },
  {
    id: "days_to_expire",
    accessorKey: "validity_date",
    header: () => <div>Dias p/ vencer</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("validity_date"));

      if (isNaN(date.getTime())) return "-";

      const today = new Date();

      const diffInMs = date.getTime() - today.getTime();
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24) - 1);

      return <span className="block text-center">{diffInDays}</span>;
    },
  },
  {
    accessorKey: "average1",
    header: "Média F1",
    cell: ({ row }) => {
      const value = row.getValue("average1");

      return <span className="block text-center">{value || value === 0 ? value.toFixed(3) : "---"}</span>;
    },
  },
  {
    accessorKey: "average2",
    header: "Média F2",
    cell: ({ row }) => {
      const value = row.getValue("average2");

      return <span className="block text-center">{value || value === 0 ? value.toFixed(3) : "---"}</span>;
    },
  },
  {
    accessorKey: "average3",
    header: "Média F3",
    cell: ({ row }) => {
      const value = row.getValue("average3");

      return <span className="block text-center">{value || value === 0 ? value.toFixed(3) : "---"}</span>;
    },
  },
  {
    accessorKey: "average4",
    header: "Média F4",
    cell: ({ row }) => {
      const value = row.getValue("average4");

      return <span className="block text-center">{value || value === 0 ? value.toFixed(3) : "---"}</span>;
    },
  },
  {
    accessorKey: "average5",
    header: "Média F5",
    cell: ({ row }) => {
      const value = row.getValue("average5");

      return <span className="block text-center">{value || value === 0 ? value.toFixed(3) : "---"}</span>;
    },
  },
  {
    accessorKey: "average7",
    header: "Média F7",
    cell: ({ row }) => {
      const value = row.getValue("average7");

      return <span className="block text-center">{value || value === 0 ? value.toFixed(3) : "---"}</span>;
    },
  },
  {
    accessorKey: "average8",
    header: "Média F8",
    header: "Média F1",
    cell: ({ row }) => {
      const value = row.getValue("average8");

      return <span className="block text-center">{value || value === 0 ? value.toFixed(3) : "---"}</span>;
    },
  },
  {
    accessorKey: "treat_id",
    header: "Tratativa",
    cell: ({ row }) => {
      const value = row.getValue("treat_id");

      return <span className="block text-center">{value}</span>;
    },
  },
];
