import database from "@/infra/database";
import { tokenHandle } from "@/tests/token.handle";

let token;
beforeAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 5; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 6;",
  );
  token = await tokenHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
});

let id;

test("DELETE to /api/v1/users/users/[id] should return 200", async () => {
  const signUpResult = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        userInfo: {
          name: "Combat Dicarted",
          username: "combat.dicarted",
          password: "12345678",
          branch_id: 1,
          winthor_id: 99997,
        },
      },
    ]),
  });
  const signUpValue = await signUpResult.json();
  id = signUpValue[0].userCreated.id;
  const responseResult = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(responseValue[0].message).toEqual("Usuário deletado com sucesso!");
});
