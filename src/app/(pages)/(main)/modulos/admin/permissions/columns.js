"use client";

import { DeletePermissionsMenu, EditPermissionsMenu } from "@/components/views/permissions.view";

export const columns = [
  {
    accessorKey: "id",
    header: <div className="pl-8">Id</div>,
    cell: ({ row }) => {
      const id = row.original;

      return <p className="pl-8">{id.id}</p>;
    },
  },
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

      return <p className="truncate max-w-100">{description.description}</p>;
    },
  },
  {
    id: "Editar",
    header: <div className="text-center">Editar</div>,
    cell: ({ row }) => {
      const permission = row.original;

      return (
        <div className="text-center">
          <EditPermissionsMenu permission={permission} />
        </div>
      );
    },
  },
  {
    id: "Excluir",
    header: <div className="text-center">Excluir</div>,
    cell: ({ row }) => {
      const permission = row.original;

      return (
        <div className="text-center">
          <DeletePermissionsMenu permission={permission} />
        </div>
      );
    },
  },
];
