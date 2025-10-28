import { DataTable } from "@/app/(modules)/admin/users/list/dataTable";
import { columns } from "@/app/(modules)/admin/users/list/columns";
import users from "@/lib/files/users.json";
import { getAllUsers } from "@/app/ui/models/auth/getUser/getAllUsers";

export default async function Page() {
  const usersDefine = await getAllUsers();
  return (
    <div className="min-h-[90vh]">
      <h1>List Users</h1>
      <DataTable columns={columns} data={usersDefine} />
    </div>
  );
}
