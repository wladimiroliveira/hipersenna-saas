"use client";

export const columns = [
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
