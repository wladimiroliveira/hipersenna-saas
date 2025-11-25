test("GET to api/v1/users/[id] should return 200", async () => {
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
  let token = signIn[0].token;

  const responseResult = await fetch(`http://localhost:3000/api/v1/users/2`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resposneValue = await responseResult.json();
  expect(responseResult.status).toEqual(200);
  expect(resposneValue.length).toBeGreaterThan(0);
});
