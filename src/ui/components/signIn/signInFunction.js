require("dotenv").config({ quiet: true });

async function signIn(username, password) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    return {
      result,
      response,
    };
  } catch (err) {
    return err;
  }
}

exports.signIn = signIn;
