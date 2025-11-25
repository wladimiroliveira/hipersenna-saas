test("PATCH to /api/v1/users/[id] should return 200", async () => {
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
  }).then((r) => r.json);
  console.log(signIn);
  let token = signIn[0].token;

  const responseResult = await fetch("http://localhost:3000/api/v1/users/2", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        name: "Second User",
        username: "second.user",
        password: process.env.BOOTSTRAP_ADMIN_PASSWORD,
        branch_id: 1,
        winthor_id: 99996,
      },
    ]),
  });
  const responseValue = await responseResult.json();
  console.log(responseValue);
});
