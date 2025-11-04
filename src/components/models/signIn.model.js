export async function signIn(body) {
  try {
    const { username, password } = body;
    const responseResult = await fetch(`/api/v1/signin`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const responseValue = await responseResult.json();
    return responseValue;
  } catch (err) {
    console.error(err);
  }
}
