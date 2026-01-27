"use client";

import { Checkbox } from "@/components/ui/checkbox";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "branch_id",
    header: "Filial",
  },
  {
    accessorKey: "codprod",
    header: "CodProd",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const value = row.getValue("description");
      return <p className="w-sm truncate">{value}</p>;
    },
  },
  {
    accessorKey: "validity_date",
    header: "Data de Validade",
  },
  {
    accessorKey: "quantity",
    header: "Qtd.",
  },
];
