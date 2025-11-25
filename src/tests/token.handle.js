export async function tokenHandle(username, password) {
  const tokenValue = await fetch("http://localhost:3000/api/v1/users/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        username,
        password,
      },
    ]),
  }).then((r) => r.json());
  return tokenValue[0].token;
}
