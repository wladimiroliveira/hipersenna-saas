export async function userHandle(username, password) {
  const userValue = await fetch("${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users/token", {
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
