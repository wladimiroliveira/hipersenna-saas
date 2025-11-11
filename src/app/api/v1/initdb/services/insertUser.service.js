import database from "@/infra/database";
import bcrypt from "bcryptjs";

export async function insertAdminUser() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const hashPassword = await bcrypt.hash(process.env.BOOTSTRAP_ADMIN_PASSWORD, 10);
    const responseResult = await dbClient.query(
      `INSERT INTO hsemployees(branch_id, winthor_id, name, username, password) VALUES (1, 99999, 'Root Admin', '${process.env.BOOTSTRAP_ADMIN_USER}', '${hashPassword}');`,
    );
    return [{ responseResult }];
  } catch (err) {
    console.error(err);
  } finally {
    await dbClient.end();
  }
}
