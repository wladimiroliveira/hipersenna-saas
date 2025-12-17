"use server";

import { getToken } from "@/lib/token/getToken";

export async function getAllUsers() {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    const users = responseValue.map((resValue) => ({
      ...resValue,
      hsusers_roles: resValue.role_id,
    }));
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      users: users,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUser(queryMode, id) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?${queryMode}=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    console.log(responseValue);
    const user = {
      ...responseValue[0],
      hsusers_roles: responseValue[0].role_id,
    };
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      user,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteUser(id) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editUser(id, body) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
