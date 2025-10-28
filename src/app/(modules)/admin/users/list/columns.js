"use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { EditUserMenu } from "@/app/ui/components/edituserMenu";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
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
