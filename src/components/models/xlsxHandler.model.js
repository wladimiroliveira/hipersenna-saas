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

export async function UploadTable(data) {
  const buffer = await data.arrayBuffer();
  const workbook = read(buffer);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const raw_data = utils.sheet_to_json(worksheet, { header: 1 });
  const rows = raw_data.filter((r) => typeof r[0] === "number");
  const objects = rows.map((r) => ({
    validity_id: r[0],
    branch_id: r[1],
    prod_id: r[6],
    product_cod: r[7],
    auxiliary_code: r[8],
    description: r[9],
    quantity: r[10],
    validity_date: r[11],
    treat_id: r[12],
  }));
  rows.map((row) => {
    row[12] =
      row[12] === "Pendente"
        ? 1
        : row[12].trim() === "Colocar em promoção"
          ? 2
          : row[12].trim() === "Troca com o fornecedor"
            ? 3
            : row[12].trim() === "Transferência interna"
              ? 4
              : row[12].trim() === "Bloqueio para venda"
                ? 5
                : row[12].trim() === "Doação"
                  ? 6
                  : row[12].trim() === "Vencido"
                    ? 7
                    : row[12].trim() === "Produto vendável dentro do prazo"
                      ? 8
                      : row[12].trim() === "Inserção tardia"
                        ? 9
                        : "Tipo inválido";
  });

  const numbers = rows.map((row) => ({
    validity_id: row[0],
    products: [
      {
        product_cod: row[7],
        treat_id: row[12],
      },
    ],
  }));

  const merged = Object.values(
    numbers.reduce((acc, curr) => {
      if (!acc[curr.validity_id]) {
        acc[curr.validity_id] = { validity_id: curr.validity_id, products: [] };
      }

      acc[curr.validity_id].products.push(...curr.products);

      return acc;
    }, {}),
  );
  return merged;
}
