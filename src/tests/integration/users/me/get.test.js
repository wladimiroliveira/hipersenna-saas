import { userHandle } from "@/tests/userHandle";

let token;
beforeAll(async () => {
  let result = await userHandle(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
  token = result.token;
});

test("GET to /api/v1/users/me should return 200", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseValue.ok).toBe(true);
});
