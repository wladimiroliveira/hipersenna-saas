import { tokenHandle } from "@/tests/token.handle";
import database from "@/infra/database";

let token;
beforeAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
  token = await tokenHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
});
afterAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
});

test("PATCH to /api/v1/users/[id] should return 200", async () => {
  const postUser = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        userInfo: {
          name: "test signup",
          username: "test.singup",
          password: "12345678",
          winthor_id: 99998,
          branch_id: 1,
          role: 2,
        },
      },
    ]),
  });

  const responseResult = await fetch("http://localhost:3000/api/v1/users/2", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        userInfo: {
          name: "Second User",
          username: "second.user",
          password: process.env.BOOTSTRAP_ADMIN_PASSWORD,
          branch_id: 1,
          winthor_id: 99996,
        },
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(typeof responseValue[0].userUpdated.id).toEqual("number");
});
