let token;

test("GET to /api/v1/users should return 200", async () => {
  const signIn = await fetch("http://localhost:3000/api/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        username: process.env.BOOTSTRAP_ADMIN_USER,
        password: process.env.BOOTSTRAP_ADMIN_PASSWORD,
      },
    ]),
  }).then((r) => r.json());
  token = signIn[0].token;

  const responseResult = await fetch(`http://localhost:3000/api/v1/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toEqual(200);
  expect(responseValue.length).toBeGreaterThan(0);
});
