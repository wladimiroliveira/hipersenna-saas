import { userHandle } from "@/tests/userHandle";

let token;
let user_id;
let session_id;
beforeAll(async () => {
  let result = await userHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
  token = result.token;
  const userValue = await fetch(`http://localhost:3000/api/v1/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
  user_id = userValue[0]?.id;
  const sessionValue = await fetch(`http://localhost:3000/api/v1/sessions?userId=${user_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
  session_id = sessionValue[0]?.id;
});

test("DELETE to /api/v1/sessions/[id] with self credentials return 200", async () => {
  const responseResult = await fetch(`http://localhost:3000/api/v1/sessions/${session_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(responseValue[0].message).toEqual("Não é possivel deletar a própria sessão");
});
