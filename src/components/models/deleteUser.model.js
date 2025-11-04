require("dotenv").config({ quiet: true });

async function deleteUser(id, token) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return { response, result };
  } catch (err) {
    return { error: err.message };
  }
}

exports.deleteUser = deleteUser;
