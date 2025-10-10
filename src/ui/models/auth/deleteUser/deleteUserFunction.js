require("dotenv").config({ quiet: true });

async function deleteUser(id, token) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ null: null }),
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

exports.deleteUser = deleteUser;
