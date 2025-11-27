export async function userHandle(username, password) {
  const userValue = await fetch("http://localhost:3000/api/v1/users/token", {
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
  const token = userValue[0].token;
  return { token };
}
