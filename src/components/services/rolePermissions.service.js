"use server";

import { getToken } from "./getToken.service";

export async function getRolePermissions(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-permissions/${data?.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
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

export async function postRolePermissions(id, permissions) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role_id: id,
        permission_id: permissions,
      }),
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
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

export async function deleteRolePermissions(id, permissions) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-permissions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role_id: id,
        permission_id: permissions,
      }),
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
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
