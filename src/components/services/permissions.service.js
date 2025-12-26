"use server";

import { getToken } from "@/components/services/getToken.service";
import { deleteToken } from "@/components/services/deleteToken.service";

export async function getPermissions() {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions`, {
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
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      permissions: [...responseValue],
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createPermission(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data?.name,
        description: data?.description,
      }),
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function patchPermission(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/${data?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data?.name,
        description: data?.description,
      }),
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deletePermission(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/${data?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      ...responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
