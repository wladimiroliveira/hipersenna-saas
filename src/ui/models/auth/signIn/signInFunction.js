require("dotenv").config({ quiet: true });

async function signIn(body) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
