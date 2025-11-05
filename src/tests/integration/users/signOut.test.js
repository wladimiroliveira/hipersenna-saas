let token;
test("POST to /api/v1/signout shoul return 200", async () => {
  const signInResult = await fetch("http://localhost:3000/api/v1/signin", {
    method: "POST",
    body: JSON.stringify([
      {
        username: "combat.machine",
        password: "08533503",
      },
    ]),
  });
  const signInValue = await signInResult.json();
  token = signInValue[0].token;
  const responseResult = await fetch("http://localhost:3000/api/v1/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        token,
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(200).toEqual(responseValue[0].status);
});

test("POST with invalid or expire token shoul return 200", async () => {
  const responseResult = await fetch("http://localhost:3000/api/v1/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        token,
      },
    ]),
  });
  const responseValue = await responseResult.json();
  expect(401).toEqual(responseValue[0].status);
});
