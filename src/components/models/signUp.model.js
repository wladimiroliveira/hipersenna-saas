require("dotenv").config({ quiet: true });

async function signUp(body, token) {
  try {
    const response = await fetch(`/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    return err;
  }
}

exports.signUp = signUp;
