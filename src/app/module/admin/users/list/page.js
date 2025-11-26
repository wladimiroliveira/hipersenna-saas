import { DataTable } from "@/components/views/dataTable.view";
import { columns } from "@/app/module/admin/users/list/columns";
import { getAllUsers } from "@/components/models/getAllUsers.model";

export default async function Page() {
  const usersDefine = await getAllUsers();
  return (
    <div className="min-h-[90vh] pl-4 pr-4">
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Lista de Usuários</h1>
      </div>
      <div className="max-w-[1060px] m-auto">
        <DataTable columns={columns} data={usersDefine} />
      </div>
    </div>
  );
}
