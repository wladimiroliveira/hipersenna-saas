import { userHandle } from "@/tests/userHandle";
import database from "@/infra/database";

let token;
let session_id;
beforeAll(async () => {
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
  const sessionValue = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/sessions?userId=${2}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
  session_id = sessionValue[0]?.id;
});
afterAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
});

test("DELETE to /api/v1/sessions/[id] with self credentials return 200", async () => {
  const responseResult = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/sessions/${session_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(typeof responseValue[0].id).toEqual("string");
});
