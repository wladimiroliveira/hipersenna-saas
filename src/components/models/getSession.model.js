async function getSession(token) {
  try {
    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/jaon",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return [response, result];
  } catch (err) {
    console.error(err);
  }
}

exports.getSession = getSession;
