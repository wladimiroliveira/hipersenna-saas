export async function editUser(id, body) {
  try {
    const responseResult = await fetch("/api/edituser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id, body]),
    });
    const result = await responseResult.json();
    return result;
  } catch (err) {
    return err;
  }
}
