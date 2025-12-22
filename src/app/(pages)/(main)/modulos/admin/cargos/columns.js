"use client";

import { DeleteRoleMenu, EditRoleMenu } from "@/components/views/roles.view";

export const columns = [
  {
    accessorKey: "name",
    header: <div className="pl-8">Nome</div>,
    cell: ({ row }) => {
      const nome = row.original;

      return <p className="pl-8">{nome.name}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.original;

      return <p className="truncate max-w-40">{description.description}</p>;
    },
  },
  {
    id: "Editar",
    header: <div className="text-center">Editar</div>,
    cell: ({ row }) => {
      const role = row.original;

      return (
        <div className="text-center">
          <EditRoleMenu role={role} />
        </div>
      );
    },
  },
  {
    id: "Excluir",
    header: <div className="text-center">Excluir</div>,
    cell: ({ row }) => {
      const role = row.original;

      return (
        <div className="text-center">
          <DeleteRoleMenu role={role} />
        </div>
      );
    },
  },
];
