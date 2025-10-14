const { cookies } = require("next/headers");

async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/jaon",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      await fetch(`${process.env.HOST_URL}/api/deletetoken`);
    }
    const result = await response.json();
    return {
      response,
      result,
    };
  } catch (err) {
    console.error(err);
  }
}

exports.getSession = getSession;
