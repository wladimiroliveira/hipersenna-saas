import database from "@/infra/database";

export async function checkAdminUser() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const checkUserResult = await dbClient.query(
      `SELECT * FROM hsemployees WHERE username = '${process.env.BOOTSTRAP_ADMIN_USER}'`,
    );
    const checkUserValue = checkUserResult.rows[0];
    // console.log(checkUserValue);
    return checkUserValue;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await dbClient.end();
  }
}
