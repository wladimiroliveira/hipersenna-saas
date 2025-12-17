import { userHandle } from "@/tests/userHandle";
import database from "@/infra/database";

let token;
beforeAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
  let result = await userHandle(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
  token = result.token;
  await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users", {
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
  }).then((r) => r.json());
  await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        username: "test.singup",
        password: "12345678",
      },
    ]),
  });
});
afterAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
});

test("DELETE to /api/v1/sessions with active sessions should return 200", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/sessions", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(responseValue[0].message).toEqual("Todas as sessões foram deletadas!");
});

test("DELETE to /api/v1/sessions with 0 sessions should return 200", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/sessions", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(responseValue[0].message).toEqual("Nenhuma sessão encontrada!");
});
