"use client";

import { useState } from "react";
import { read, utils, writeFile } from "xlsx";

export function DownloadTable(data) {
  const product = data.map((row) => ({
    ...row,
    created_at: new Date(row.created_at).toLocaleDateString("pt-BR"),
    modified_at: new Date(row.modified_at).toLocaleDateString("pt-BR"),
    validity_date: new Date(row.validity_date).toLocaleDateString("pt-BR"),
  }));
  let firstDate = product[0].validity_date;
  let lastDate = product[product.length - 1].validity_date;
  const worksheet = utils.json_to_sheet(product);
  const workbook = utils.book_new();
  firstDate = firstDate.replaceAll("/", "-");
  lastDate = lastDate.replaceAll("/", "-");
  const sheetName = `Validade ${firstDate} ${lastDate}`;
  utils.book_append_sheet(workbook, worksheet, `${firstDate} - ${lastDate}`);
  writeFile(workbook, `${sheetName}.xlsx`, { compression: true });
}
