"use server";

import { getToken } from "@/components/services/getToken.service";
import { deleteToken } from "@/components/services/deleteToken.service";

export async function getRoles() {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
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
      roles: [...responseValue],
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getRole(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/roles?${data?.searchModality}=${data?.searchParam}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      role: responseResult?.ok ? [...responseValue] : responseValue?.message,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createRole(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
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

export async function patchRole(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${data?.id}`, {
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

export async function deleteRole(data) {
  try {
    const token = await getToken();
    const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${data?.id}`, {
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
