import database from "@/infra/database";
import { userHandle } from "@/tests/userHandle";

let token;
beforeAll(async () => {
  await database.query("DELETE FROM hsroles WHERE id > 3; ALTER SEQUENCE public.hsroles_id_seq RESTART WITH 4;");
  let result = await userHandle(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
  token = result.token;
});

test("POST to /api/v1/roles should return 201", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/roles", {
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
  expect(typeof responseValue[0].id).toEqual("number");
});
