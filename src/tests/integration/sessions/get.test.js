import { tokenHandle } from "@/tests/token.handle";

let token;
beforeAll(async () => {
  token = await tokenHandle(process.env.BOOTSTRAP_ADMIN_USER, process.env.BOOTSTRAP_ADMIN_PASSWORD);
});

test("GET to /api/v1/sessions without search params should return 200", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/sessions", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(typeof responseValue[0].id).toEqual("string");
});

test("GET to /api/v1/sessions with search userId should return 200", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/sessions?userId=1", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toBe(200);
  expect(Array.isArray(responseValue)).toBe(true);
  expect(responseValue.length).toBeGreaterThan(0);
  expect(typeof responseValue[0].id).toEqual("string");
});
