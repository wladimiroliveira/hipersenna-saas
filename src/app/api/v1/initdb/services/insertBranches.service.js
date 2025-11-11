import database from "@/infra/database";

export async function insertBranches() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const searchBranchsResult = await dbClient.query("SELECT * FROM hsbranches");
    const searchBranchsValue = searchBranchsResult.rows[0];
    if (!searchBranchsValue) {
      const insertBranchResult = await dbClient.query("INSERT INTO hsbranches(description) VALUES ('Matriz');");
      const insertBranchValue = insertBranchResult.rows[0];
      return [{ ok: true, createBranch: true }];
    }

    return [{ ok: true, createBranch: false }];
  } catch (err) {
    console.error(err);
  } finally {
    await dbClient.end();
  }
}
