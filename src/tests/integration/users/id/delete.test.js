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

test("DELETE to /api/v1/users/deleteuser should return 200", async () => {
  const signInResult = await fetch("http://localhost:3000/api/v1/signin", {
    method: "POST",
    body: JSON.stringify([
      {
        username: process.env.BOOTSTRAP_ADMIN_USER,
        password: process.env.BOOTSTRAP_ADMIN_PASSWORD,
      },
    ]),
  });
  const signInValue = await signInResult.json();
  token = signInValue[0].token;

  const signUpResult = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        userInfo: {
          name: "Combat Dicarted",
          username: "combat.dicarted",
          password: "12345678",
          branch_id: 1,
          winthor_id: 99997,
        },
      },
    ]),
  });
  const signUpValue = await signUpResult.json();
  id = signUpValue[0].userCreated.id;
  const responseResult = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseValue[0].status).toEqual(200);
});
