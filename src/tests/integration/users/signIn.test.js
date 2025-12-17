test("POST to /api/v1/users/signin should return 200", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/signin", {
    method: "POST",
    body: JSON.stringify([
      {
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASSWORD,
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(responseResult.status).toEqual(200);
  expect(responseValue[0].message).toEqual("Usuário logado com sucesso!");
});

test("POST with incorrect credentials should return 400", async () => {
  const responseResult = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        username: "invalid",
        password: "credentials",
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(responseValue[0].message).toEqual("Usuário ou senha estão incorretos!");
});
