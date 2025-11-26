const { Client } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config({ quiet: true, path: ".env.development" });

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
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  try {
    await dbClient(
      `INSERT INTO hsemployees(branch_id, winthor_id, name, username, password) VALUES (1, 99999, 'Root Admin', '${process.env.ADMIN_USER}', '${hashedPassword}')`,
    );

    console.log(".");
    await dbClient("INSERT INTO hsusers_roles(user_id, role_id) VALUES (1, 1)");
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  await initDatabase();
})();
