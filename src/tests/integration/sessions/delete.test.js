import { userHandle } from "@/tests/userHandle";

let token;
beforeAll(async () => {
  let result = await userHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
  token = result.token;
});

test("DELETE to /api/v1/sessions should return somecode", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/sessions", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(typeof responseValue[0].count).toEqual("number");
});
