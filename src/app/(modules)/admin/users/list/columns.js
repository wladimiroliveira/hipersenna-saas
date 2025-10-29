"use client";

import { EditUserMenu } from "@/app/ui/components/edituserMenu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("id");
      return <div className="pl-7">{value}</div>;
    },
  },
  {
    accessorKey: "branch_id",
    header: "Filial",
  },
  {
    accessorKey: "access_level",
    header: "Nível de Acesso",
  },
  {
    accessorKey: "winthor_id",
    header: "Matrícula",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "created_at",
    header: () => <div>Criado em</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));

      if (isNaN(date.getTime())) return "-";

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "modified_at",
    header: () => <div>Modificado em</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("modified_at"));

      if (isNaN(date.getTime())) return "-";

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "Ações",
    cell: ({ row }) => {
      const user = row.original;

      return <EditUserMenu user={user} />;
    },
  },
];
