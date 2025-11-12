const { Client } = require("pg");
const permissions = require("../../lib/files/permissions.json");
const roles = require("../../lib/files/roles.json");
const treatments = require("../../lib/files/treatments.json");
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
  async function insertPermissionRoles() {
    const permissionsResult = await dbClient("SELECT * FROM hspermissions");
    const permissionsLength = permissionsResult.rows.length;
    if (permissionsLength !== 27) {
      console.log("Waiting permissions");
      return insertPermissionRoles();
    }
    permissions.map(async (permission) => {
      await dbClient(
        `INSERT INTO hspermissions_roles(role_id, permission_id) VALUES (${roles[0].id}, ${permission.id})`,
      );
    });
  }
  const hashedPassword = await bcrypt.hash(process.env.BOOTSTRAP_ADMIN_PASSWORD, 10);
  try {
    const branchesResult = await dbClient("SELECT * FROM hsbranches");
    const branchesValue = branchesResult.rows[0];
    if (branchesValue) {
      console.log(
        "ℹ️  The database is ready.\n\nIf you want to restart the instance, run the command `npm run services:down` then `npm run dev`\n",
      );
      return;
    }
    console.log("🟠 Initializing database");

    console.log(".");
    await dbClient(
      "INSERT INTO hsbranches(description) VALUES ('Matriz'), ('Faruk'), ('Carajás'), ('VS10'), ('Xinguara'), ('DP6'), ('Cidade Jardim'), ('Canaã');",
    );

    console.log(".");
    permissions.map(async (permission) => {
      await dbClient(
        `INSERT INTO hspermissions(name, description) VALUES ('${permission.name}', '${permission.description}')`,
      );
    });

    console.log(".");
    roles.map(async (role) => {
      await dbClient(`INSERT INTO hsroles(name, description) VALUES ('${role.name}', '${role.description}')`);
    });

    console.log(".");
    await insertPermissionRoles();

    console.log(".");
    await dbClient(
      `INSERT INTO hsemployees(branch_id, winthor_id, name, username, password) VALUES (1, 99999, 'Root Admin', '${process.env.BOOTSTRAP_ADMIN_USER}', '${hashedPassword}')`,
    );

    console.log(".");
    await dbClient("INSERT INTO hsusers_roles(user_id, role_id) VALUES (1, 1)");

    console.log(".");
    treatments.map(async (treatment) => {
      await dbClient(`INSERT INTO hsvalidity_treatments(description) VALUES('${treatment.description}')`);
    });

    console.log("🟢 The database is ready");
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  await initDatabase();
})();
