require("dotenv").config({ quiet: true });

async function signUp(
  name,
  username,
  access_level,
  branch_id,
  password,
  winthor_id
) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        access_level,
        branch_id,
        password,
        winthor_id,
      }),
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
