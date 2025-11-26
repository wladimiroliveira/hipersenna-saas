import { userHandle } from "@/tests/userHandle";
import database from "@/infra/database";

let token;
beforeAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
  let result = await userHandle(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
  token = result.token;
  await fetch("http://localhost:3000/api/v1/users", {
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
});
afterAll(async () => {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
});

test("GET to api/v1/users/[id] should return 200", async () => {
  const responseResult = await fetch(`http://localhost:3000/api/v1/users/2`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toEqual(200);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(typeof responseValue[0].id).toEqual("number");
});
