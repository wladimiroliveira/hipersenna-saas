import { userHandle } from "@/tests/userHandle";

let token;
beforeAll(async () => {
  let result = await userHandle(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
  token = result.token;
});

test("DELETE to /api/v1/sessions/me should return 200", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/sessions/me", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(responseValue[0].message).toEqual("Signout realizado com sucesso");
});
