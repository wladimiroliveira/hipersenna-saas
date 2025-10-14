require("dotenv").config({ quiet: true });

async function signOut(token) {
  if (token) {
    try {
      const response = await fetch(`${process.env.API_URL}/users/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ null: null }),
      });

      const result = await response.json();
      if (response.ok) {
        await fetch(`${process.env.HOST_URL}/api/deletetoken`);
      }
      return {
        response,
        result,
      };
    } catch (err) {
      return err;
    }
  } else {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
}

exports.signOut = signOut;
