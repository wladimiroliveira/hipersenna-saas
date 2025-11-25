import database from "@/infra/database";
let token;

beforeAll(cleanUsers);

async function cleanUsers() {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
}

test("POST to /api/v1/users/users/singup should return 201", async () => {
  const signInResult = await fetch("http://localhost:3000/api/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        username: process.env.BOOTSTRAP_ADMIN_USER,
        password: process.env.BOOTSTRAP_ADMIN_PASSWORD,
      },
    ]),
  });
  const signInValue = await signInResult.json();
  token = signInValue[0].token;
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
  expect(201).toEqual(responseValue[0].status);
  expect(true).toBe(responseValue[0].userCreated !== false);
  expect(true).toBe(responseValue[0].assinedRole !== false);
  expect(true).toBe(responseValue[0].permissions !== false);
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
  expect(responseValue[0].status).toEqual(409);
});
