import { userHandle } from "@/tests/userHandle";

let token;
beforeAll(async () => {
  let result = await userHandle(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
  token = result.token;
});

test("GET to /api/v1/roles should return 200", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/roles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
});
