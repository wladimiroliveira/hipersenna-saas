"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
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
    accessorKey: "branch_id",
    header: "Filial",
  },
  {
    accessorKey: "employee_id",
    header: "Id Colab.",
  },
  {
    accessorKey: "created_at",
    header: "Dt. Inserção",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));

      if (isNaN(date.getTime())) return "-";

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "product_code",
    header: "Cod. Prod.",
  },
  {
    accessorKey: "auxiliary_code",
    header: "Cod. Barras",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const value = row.getValue("description");

      return <p className="truncate max-w-60">{value}</p>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quant.",
  },
  {
    accessorKey: "department_id",
    header: "Depart.",
  },
  {
    accessorKey: "supplier_id",
    header: "Id Fornec.",
  },
  {
    accessorKey: "supplier_name",
    header: "Nome Fornecedor",
    cell: ({ row }) => {
      const value = row.getValue("supplier_name");

      return <p className="truncate max-w-60">{value}</p>;
    },
  },
  {
    accessorKey: "buyer_id",
    header: "Id Compr.",
  },
  {
    accessorKey: "buyer_name",
    header: "Nome Comprador",
    cell: ({ row }) => {
      const value = row.getValue("buyer_name");

      return <p className="truncate max-w-60">{value}</p>;
    },
  },
  {
    accessorKey: "validity_date",
    header: "Dt. Validade",
    cell: ({ row }) => {
      const date = new Date(row.getValue("validity_date"));

      if (isNaN(date.getTime())) return "-";

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <p>{formattedDate}</p>;
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

      return <p>{value || value === 0 ? value.toFixed(3) : "---"}</p>;
    },
  },
  {
    accessorKey: "average2",
    header: "Média F2",
    cell: ({ row }) => {
      const value = row.getValue("average2");

      return <p>{value || value === 0 ? value.toFixed(3) : "---"}</p>;
    },
  },
  {
    accessorKey: "average3",
    header: "Média F3",
    cell: ({ row }) => {
      const value = row.getValue("average3");

      return <p>{value || value === 0 ? value.toFixed(3) : "---"}</p>;
    },
  },
  {
    accessorKey: "average4",
    header: "Média F4",
    cell: ({ row }) => {
      const value = row.getValue("average4");

      return <p>{value || value === 0 ? value.toFixed(3) : "---"}</p>;
    },
  },
  {
    accessorKey: "average5",
    header: "Média F5",
    cell: ({ row }) => {
      const value = row.getValue("average5");

      return <p>{value || value === 0 ? value.toFixed(3) : "---"}</p>;
    },
  },
  {
    accessorKey: "average7",
    header: "Média F7",
    cell: ({ row }) => {
      const value = row.getValue("average7");

      return <p>{value || value === 0 ? value.toFixed(3) : "---"}</p>;
    },
  },
  {
    accessorKey: "average8",
    header: "Média F8",
    cell: ({ row }) => {
      const value = row.getValue("average8");

      return <p>{value || value === 0 ? value.toFixed(3) : "---"}</p>;
    },
  },
  {
    accessorKey: "treat_id",
    header: "Tratativa",
    cell: ({ row }) => {
      const value = row.getValue("treat_id");

      return <p>{value}</p>;
    },
  },
];
