import { checkAdminUser } from "@/app/api/v1/initdb/services/checkUser.service";
import { insertAdminUser } from "@/app/api/v1/initdb/services/insertUser.service";
import { insertBranches } from "./services/insertBranches.service";

export async function POST(request) {
  try {
    const adminUserValue = await checkAdminUser();
    console.log(adminUserValue);
    if (!adminUserValue) {
      const branches = await insertBranches();
      const adminUser = await insertAdminUser();
      return;
    }

    return Response.json([
      {
        user: process.env.BOOTSTRAP_ADMIN_USER,
        result: process.env.adminUserValue,
      },
    ]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
