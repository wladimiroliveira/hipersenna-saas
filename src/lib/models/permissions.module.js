"use server";

import { getToken } from "@/lib/token/getToken";

export async function getUserPermissions(id) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.API_URL}/user-permissions/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      permissions: responseResult.ok
        ? responseValue.map((permission) => permission.permission_id)
        : responseValue.message,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function postUserPermissions(id, permissions) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.API_URL}/user-permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: id,
        permission_id: permissions,
      }),
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      permissions: permissions,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteUserPermissions(id, permissions) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.API_URL}/user-permissions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: id,
        permission_id: permissions,
      }),
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult.ok,
      status: responseResult.status,
      permissions: permissions,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
