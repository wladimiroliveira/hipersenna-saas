require("dotenv").config({ quiet: true });

async function signIn(body) {
  try {
    const responseResult = await fetch(`/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await responseResult.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

exports.signIn = signIn;
