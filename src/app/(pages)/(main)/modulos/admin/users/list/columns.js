"use client";

import { EditUserMenu } from "@/components/views/editUser.view";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import branches from "@/files/branches.json";
import { useEffect, useState } from "react";
import { getRoles } from "@/components/services/role.service";

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
    cell: ({ row }) => {
      const value = row.getValue("branch_id");
      const name = () => {
        const item = branches.find((branch) => branch.id === value);
        return item ? item.name : null;
      };
      return <div>{name()}</div>;
    },
  },
  {
    accessorKey: "hsusers_roles",
    header: "Cargo",
    cell: ({ row }) => {
      useEffect(() => {
        async function handleGetRoles() {
          const rolesValue = await getRoles();
          setRoles(rolesValue?.roles);
        }
        handleGetRoles();
      }, []);
      const [roles, setRoles] = useState(false);
      const value = row.getValue("hsusers_roles");
      const name = () => {
        const item = roles && roles.find((role) => role?.id === value);
        if (roles) return item ? item?.name : null;
      };
      return <div className="capitalize">{name()}</div>;
    },
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
    accessorKey: "username",
    header: "Usuário",
  },
  {
    accessorKey: "created_at",
    header: () => <div>Criado em</div>,
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
    accessorKey: "modified_at",
    header: () => <div>Modificado em</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("modified_at"));

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
    id: "Ações",
    cell: ({ row }) => {
      const user = row.original;

      return <EditUserMenu user={user} />;
    },
  },
];
