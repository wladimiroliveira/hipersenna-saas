test("POST to /api/v1/signin should return 200", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/signin", {
    method: "POST",
    body: JSON.stringify([
      {
        username: "combat.machine",
        password: "08533503",
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(200).toEqual(responseValue[0].status);
});

test("POST with incorrect credentials should return 400", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/signin", {
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
  expect(400).toEqual(responseValue[0].status);
});
