import { Checkbox } from "@/components/ui/checkbox";

function limitarCasas(number, casas) {
  return Number.isInteger(number) ? number : Number(number.toFixed(casas));
}

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
  },
  {
    accessorKey: "branchId",
    header: "Filial",
  },
  {
    accessorKey: "department",
    header: "Depart.",
  },
  {
    accessorKey: "productCode",
    header: "Cód. Prod.",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const value = row.getValue("description");

      return <p className="truncate w-2xs">{value}</p>;
    },
  },
  {
    accessorKey: "inputQuantity",
    header: "Qtd",
    cell: ({ row }) => {
      const value = row.getValue("inputQuantity");

      return <p>{limitarCasas(value, 2)}</p>;
    },
  },
  {
    accessorKey: "bonusDate",
    header: "Dt. Inser.",
  },
  {
    accessorKey: "validityDate",
    header: "Dt. Valid.",
  },
  {
    accessorKey: "average1",
    header: "Média F1",
    cell: ({ row }) => {
      const value = row.getValue("average1");

      return <p>{value.toFixed(3)}</p>;
    },
  },
  {
    accessorKey: "average2",
    header: "Média F2",
    cell: ({ row }) => {
      const value = row.getValue("average2");

      return <p>{value.toFixed(3)}</p>;
    },
  },
  {
    accessorKey: "average3",
    header: "Média F3",
    cell: ({ row }) => {
      const value = row.getValue("average3");

      return <p>{value.toFixed(3)}</p>;
    },
  },
  {
    accessorKey: "average4",
    header: "Média F4",
    cell: ({ row }) => {
      const value = row.getValue("average4");

      return <p>{value.toFixed(3)}</p>;
    },
  },
  {
    accessorKey: "average5",
    header: "Média F5",
    cell: ({ row }) => {
      const value = row.getValue("average5");

      return <p>{value.toFixed(3)}</p>;
    },
  },
  {
    accessorKey: "average7",
    header: "Média F7",
    cell: ({ row }) => {
      const value = row.getValue("average7");

      return <p>{value.toFixed(3)}</p>;
    },
  },
];
