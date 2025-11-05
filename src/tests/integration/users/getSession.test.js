let token;

test("POST to /api/v1/session should return 200", async () => {
  const signInResult = await fetch("http://localhost:3000/api/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        username: "combat.child",
        password: "12345678",
      },
    ]),
  });
  const signInValue = await signInResult.json();
  const token = signInValue[0].token;

  const responseResult = await fetch(`http://localhost:3000/api/v1/session`, {
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
