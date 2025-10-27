import query from "@/infra/database";

export async function GET(request) {
  try {
    const databaseVersionResult = await query("SHOW server_version;");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;
    const databaseMaxConnectionsResult = await query("SHOW max_connections;");
    const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const databaseOpenedConnectionsResult = await query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    // `SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`,
    const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count;
    const updatedAt = new Date().toISOString();
    return Response.json([
      {
        updated_at: updatedAt,
        dependencies: {
          database: {
            version: databaseVersionValue,
            max_connections: parseInt(databaseMaxConnectionsValue),
            opened_connections: databaseOpenedConnectionsValue,
          },
        },
      },
    ]);
  } catch (err) {
    console.error(err);
  }
}
