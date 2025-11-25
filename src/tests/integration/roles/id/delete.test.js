import database from "@/infra/database";
import { userHandle } from "@/tests/userHandle";

let token;
beforeAll(async () => {
  let result = await userHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
  token = result.token;
  await database.query("DELETE FROM hsroles WHERE id > 3; ALTER SEQUENCE public.hsroles_id_seq RESTART WITH 4;");
  await fetch("http://localhost:3000/api/v1/roles", {
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
});
afterAll(async () => {
  await database.query("DELETE FROM hsroles WHERE id > 3; ALTER SEQUENCE public.hsroles_id_seq RESTART WITH 4;");
});

test("DELETE to /api/v1/roles/[id] should return something", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/roles/4", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(typeof responseValue[0]?.id).toEqual("number");
});
