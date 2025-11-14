import database from "@/infra/database";
let token;

beforeAll(cleanUsers);

async function cleanUsers() {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 1; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 2;",
  );
}

test("POST to /api/v1/users/users/singup should return 201", async () => {
  const signInResult = await fetch("http://localhost:3000/api/v1/users/signin", {
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
  const responseResult = await fetch("http://localhost:3000/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        token,
        info: {
          name: "test signup",
          username: "test.singup",
          password: "12345678",
          winthor_id: 99998,
          branch_id: 1,
        },
        roles: [2],
        permissions: [1, 2, 3, 7, 9, 11, 17, 21, 22, 23, 24, 25, 26],
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
  const responseResult = await fetch("http://localhost:3000/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        token,
        info: {
          name: "test signup",
          username: "test.singup",
          password: "12345678",
          winthor_id: 99998,
          branch_id: 1,
        },
        roles: [{ id: 2 }],
        permissions: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 7 },
          { id: 9 },
          { id: 11 },
          { id: 17 },
          { id: 21 },
          { id: 22 },
          { id: 23 },
          { id: 24 },
          { id: 25 },
          { id: 26 },
        ],
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(409).toEqual(responseValue[0].status);
});
