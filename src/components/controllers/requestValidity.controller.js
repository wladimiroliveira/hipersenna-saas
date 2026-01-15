"use client";

import { useState } from "react";
import { RequestValidityFilter } from "../views/requestValidityFilter.view";
import { DataTable } from "@/app/(pages)/(main)/modulos/vencimento/request/dataTable";
import { columns } from "@/app/(pages)/(main)/modulos/vencimento/request/columns";

export function RequestValidityController() {
  const [data, setData] = useState(false);
  const handleFetch = (data) => {
    setData(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <RequestValidityFilter handleFetch={handleFetch} />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
