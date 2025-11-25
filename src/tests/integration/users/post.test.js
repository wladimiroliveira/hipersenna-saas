import { userHandle } from "@/tests/userHandle";
import database from "@/infra/database";

let token;
beforeAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
  let result = await userHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
  token = result.token;
});
afterAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
});

test("POST to /api/v1/users/users/singup should return 201", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/users", {
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
  const responseValue = await responseResult.json();
  expect(responseResult.status).toEqual(200);
  expect(responseValue[0].userCreated !== false).toBe(true);
  expect(responseValue[0].assinedRole !== false).toBe(true);
  expect(responseValue[0].permissions !== false).toBe(true);
});

test("POST with existing credentials should return 409", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/users", {
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
  const responseValue = await responseResult.json();
  expect(responseValue[0].message).toEqual("Username ou código do winthor já cadastrados no sistema");
});
