require("dotenv").config({ quiet: true });

async function getUser(id, token) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

exports.getUser = getUser;
