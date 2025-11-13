export async function signIn(data) {
  try {
    const { username, password } = data[0];
    const responseResult = await fetch(`/api/v1/users/signin`, {
      method: "POST",
      body: JSON.stringify([
        {
          username,
          password,
        },
      ]),
    });
    const responseValue = await responseResult.json();
    return responseValue;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
