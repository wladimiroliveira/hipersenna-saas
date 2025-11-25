import database from "@/infra/database";
import { tokenHandle } from "@/tests/token.handle";

let token;
beforeAll(async () => {
  await database.query("DELETE FROM hsroles WHERE id > 3; ALTER SEQUENCE public.hsroles_id_seq RESTART WITH 4;");
  token = await tokenHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
});

test("PATCH to /api/v1/roles/[id] should return something", async () => {
  const postRole = await fetch("http://localhost:3000/api/v1/roles", {
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

  const responseResult = await fetch("http://localhost:3000/api/v1/roles/4", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        name: "Encarregado de Salão",
        description:
          "O(a) encarregado(a) de salão tem como prioridades os módulos de gerenciamento de vencimento, gerenciamento de estoque, e gerenciamento de gôndolas",
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(typeof responseValue[0].id).toEqual("number");
});
