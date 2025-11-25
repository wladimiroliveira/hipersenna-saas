import { tokenHandle } from "@/tests/token.handle";

let token;
beforeAll(async () => {
  token = await tokenHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
});

test("GET to /api/v1/users/me should return 200", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toEqual(200);
  expect(responseValue.length).toBeGreaterThan(0);
});
