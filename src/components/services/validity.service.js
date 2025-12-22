"use server";

import { getToken } from "@/components/services/getToken.service";

export async function getValidity(params) {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/validities?`;

    if (params.branch_id > 0) {
      url = url + "branch_id=" + params.branch_id + "&";
    }
    if (params.qt_days) {
      url = url + "expiresDays=" + params.qt_days + "&";
    }
    if (params.prod) {
      url = url + params.prodModality + params.prod + "&";
    }
    if (params.validityDate?.from && params.validityDate?.to) {
      url =
        url +
        "initialValidtyDate=" +
        params.validityDate?.from +
        "&" +
        "finalValidtyDate=" +
        params.validityDate?.to +
        "&";
    }
    if (params.insertDate?.from && params.insertDate?.to) {
      url =
        url + "initialInsertDate=" + params.insertDate?.from + "&" + "finalInsertDate=" + params.insertDate?.to + "&";
    }

    const token = await getToken();

    const responseResult = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      validities: Array.isArray(responseValue) ? [...responseValue] : responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
