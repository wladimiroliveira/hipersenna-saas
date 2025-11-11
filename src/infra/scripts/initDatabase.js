const { Client } = require("pg");
require("dotenv").config({ quiet: true, path: ".env.development" });
const { exec } = require("node:child_process");

async function dbClient(queryObjects) {
  let client;
  try {
    client = new Client({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      ssl: process.env.NODE_ENV === "production" ? true : false,
    });
    await client.connect();
    const result = await client.query(queryObjects);
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

async function initDatabase() {
  try {
    if (process.env.NODE_ENV !== "production") {
      await dbClient("drop schema public cascade; create schema public;");
    }
    exec("npm run dev", handleReturn);
    function handleReturn(error, stdout) {
      process.stdout.write("run");
      return;
    }
    // console.log("🟠 Initializing database");

    // const branchesResult = await dbClient("SELECT * FROM hsbranches;");
    // const branchesValue = branchesResult.rows[0];
    // if (!branchesValue) {
    //   console.log("🟡 Criando filiais");
    //   const createBranchesResult = await dbClient(
    //     "INSERT INTO hsbranches(description) VALUES ('Matriz'), ('Faruk'), ('Carajás'), ('VS10'), ('Xinguara'), ('DP6'), ('Cidade Jardim'), ('Canaã');",
    //   );
    //   const viewBranchesResult = await dbClient("SELECT * FROM hsbranches;");
    //   const viewBranchesValue = viewBranchesResult.rows;
    //   if (!viewBranchesValue) {
    //     console.error("Erro a criar branches!");
    //     return;
    //   }
    //   console.log(viewBranchesValue);
    // }

    // console.log("🟢 The database is ready");
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  await initDatabase();
})();
