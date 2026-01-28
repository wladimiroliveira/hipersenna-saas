"use server";

import { getToken } from "@/components/services/getToken.service";
import { deleteToken } from "@/components/services/deleteToken.service";

export async function postValidities(payload) {
  const token = await getToken();
  const responseResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const responseValue = await responseResult.json();
  return {
    ok: responseResult?.ok,
    status: responseResult?.status,
    message: responseResult?.message,
  };
}

export async function getValidities(params) {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/validities?`;

    if (params.branch_id > 0) url = url + "branch_id=" + params.branch_id + "&";
    if (params.qt_days) url = url + "expiresDays=" + params.qt_days + "&";
    if (params.prod) url = url + params.prodModality + "=" + params.prod + "&";
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
        url +
        "initialCreationDate=" +
        params.insertDate?.from +
        "&" +
        "finalCreationDate=" +
        params.insertDate?.to +
        "&";
    }

    const token = await getToken();

    const responseResult = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseValue = await responseResult.json();
    if (responseResult?.status === 401) {
      await deleteToken();
    }
    let flattenedData;
    if (Array.isArray(responseValue) && responseValue.length > 1) {
      flattenedData = responseValue.flatMap((parent) =>
        parent.hsvalidity_products.map((child) => ({
          validity_id: parent?.id,
          product_id: child?.id,
          request_id: parent?.request_id,
          employee_id: parent?.employee_id,
          created_at: parent?.created_at,
          product_code: child?.product_code,
          auxiliary_code: child?.auxiliary_code,
          description: child?.description,
          quantity: child?.quantity,
          department_id: child?.department_id,
          supplier_id: child?.supplier_id,
          supplier_name: child?.supplier_name,
          buyer_id: child?.buyer_id,
          buyer_name: child?.buyer_name,
          branch_id: parent?.branch_id,
          validity_date: child?.validity_date,
          average1: child?.average1,
          average2: child?.average2,
          average3: child?.average3,
          average4: child?.average4,
          average5: child?.average5,
          average7: child?.average7,
          average8: child?.average8,
          treat_id: Number(child?.treat_id),
        })),
      );
    }
    return {
      ok: responseResult?.ok,
      status: responseResult?.status,
      message: responseResult?.message,
      validities: Array.isArray(flattenedData) ? flattenedData : responseValue,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
