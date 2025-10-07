require("dotenv").config({ quiet: true });

async function signUp(body, token) {
  try {
    const response = await fetch(`${process.env.API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return {
      response,
      result,
    };
  } catch (err) {
    return err;
  }
}

exports.signUp = signUp;
