require("dotenv").config({ quiet: true });

async function editUser(id, token, body) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "PATCH",
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

exports.editUser = editUser;
