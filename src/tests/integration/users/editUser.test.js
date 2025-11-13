import database from "@/infra/database";

beforeAll(cleanUsers);

async function cleanUsers() {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 4; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 5;",
  );
}

let token;
let id;

test("PATCH to /api/v1/users/edituser should return 200", async () => {
  const signInResult = await fetch("http://localhost:3000/api/v1/users/signin", {
    method: "POST",
    body: JSON.stringify([
      {
        username: "combat.machine",
        password: "08533503",
      },
    ]),
  });
  const signInValue = await signInResult.json();
  token = signInValue[0].token;
  const signUpResult = await fetch("http://localhost:3000/api/v1/users/signup", {
    method: "POST",
    body: JSON.stringify([
      {
        token,
        info: {
          name: "Combat Sun",
          username: "combat.sun",
          password: "12345678",
          winthor_id: 999997,
          branch_id: 1,
          access_level: 1,
        },
      },
    ]),
  });
  const signUpValue = await signUpResult.json();
  id = signUpValue[0].userCreated.id;

  const responseResult = await fetch("http://localhost:3000/api/v1/users/edituser", {
    method: "PATCH",
    body: JSON.stringify([
      {
        id,
        token,
        info: {
          name: "Combat Sun Machine",
          username: "combat.sun.machine",
          password: "87654321",
          branch_id: 1,
          winthor_id: 999987,
          access_level: 1,
        },
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(200).toEqual(responseValue[0].status);
});
