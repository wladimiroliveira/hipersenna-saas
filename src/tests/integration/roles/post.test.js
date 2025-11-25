import database from "@/infra/database";
import { tokenHandle } from "@/tests/token.handle";

let token;
beforeAll(async () => {
  await database.query("DELETE FROM hsroles WHERE id > 3; ALTER SEQUENCE public.hsroles_id_seq RESTART WITH 4;");
  token = await tokenHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
});

test("POST to /api/v1/roles should return 201", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        name: "Encarregado",
        description: "O cargo de envarregado tem maior prioridade nos módulos de vencimento e controle de estoque",
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
});
