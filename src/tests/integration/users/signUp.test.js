import database from "@/infra/database";
let token;

beforeAll(cleanUsers);

async function cleanUsers() {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 3; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 4;",
  );
}

test("POST to /api/v1/singup should return 201", async () => {
  const signInResult = await fetch("http://localhost:3000/api/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        username: "combat.machine",
        password: "08533503",
      },
    ]),
  });
  const signInValue = await signInResult.json();
  token = signInValue[0].token;
  const responseResult = await fetch("http://localhost:3000/api/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        token,
        info: {
          name: "Combat Child",
          username: "combat.child",
          password: "12345678",
          winthor_id: 999998,
          branch_id: 1,
          access_level: 1,
        },
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(201).toEqual(responseValue[0].status);
});

test("POST with existing credentials should return 409", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        token,
        info: {
          name: "Combat Child",
          username: "combat.child",
          password: "12345678",
          winthor_id: 999998,
          branch_id: 1,
          access_level: 1,
        },
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(409).toEqual(responseValue[0].status);
});
