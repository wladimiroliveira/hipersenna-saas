import { DataTable } from "./datatable";
import { columns } from "./columns";
import { getPermissions } from "@/components/services/permissions.service";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function getData() {
  const permissions = await getPermissions();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(permissions?.permissions);
    }, 1000),
  );
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="pt-10 pl-4 pr-4">
      <div className="flex flex-row w-full pt-0 p-8">
        <div className="w-full m-auto">
          <h1 className="text-2xl text-primaria font-bold">Permissões</h1>
          <p>Adicione, remova, e edite permissões através da tabela abaixo</p>
          <Suspense fallback={<>Loading...</>}>
            <DataTable columns={columns} data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
