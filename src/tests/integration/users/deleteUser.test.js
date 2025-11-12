import database from "@/infra/database";
import { userAgentFromString } from "next/server";

beforeAll(cleanUsers);

async function cleanUsers() {
  await database.query(
    "DELETE FROM hsemployees WHERE id > 5; ALTER SEQUENCE public.hsemployees_id_seq RESTART WITH 6;",
  );
}

let id;
let token;

test("DELETE to /api/v1/users/deleteuser should return", async () => {
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
          name: "Combat Dicarted",
          username: "combat.dicarted",
          password: "12345678",
          branch_id: 1,
          winthor_id: 999996,
          access_level: 1,
        },
      },
    ]),
  });
  const signUpValue = await signUpResult.json();
  id = signUpValue[0].userCreated.id;

  const responseResult = await fetch("http://localhost:3000/api/v1/users/deleteuser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        id,
        token,
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(200).toEqual(responseValue[0].status);
});
