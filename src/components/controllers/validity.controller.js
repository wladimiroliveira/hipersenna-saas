"use client";
import { useState } from "react";
import { ValidityFilter } from "@/components/views/filterValidity.view";
import { DataTable } from "@/app/(pages)/(main)/modulos/vencimento/analise/datatable";
import { columns } from "@/app/(pages)/(main)/modulos/vencimento/analise/columns";
import { DownloadTable } from "@/components/services/xlsxHandler.service";
import { getValidities } from "@/components/services/validity.service";
import { generateReport } from "../services/validityReport.service";

export function ValidityAnylises() {
  const [prodDesc, setProdDesc] = useState("Consulte o produto...");
  const [mainLoading, setMainLoading] = useState(false);
  const [prodList, setProdList] = useState([]);
  const [searchParams, setSearchParams] = useState(false);

  async function handleSubmit(data) {
    try {
      setMainLoading(true);
      setSearchParams(data);
      const validityValue = await getValidities(data);
      if (validityValue?.ok) {
        setProdList(validityValue?.validities);
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setMainLoading(false);
    }
  }

  async function handleInputsClear() {
    setProdList([]);
    setProdDesc("Consulte um produto...");
  }

  return (
    <div>
      <ValidityFilter
        prodDesc={prodDesc}
        onClear={handleInputsClear}
        onSubmitData={handleSubmit}
        mainLoading={mainLoading}
      />
      <DataTable
        columns={columns}
        data={prodList}
        generateReport={() => {
          generateReport(prodList);
        }}
        downloadTable={() => {
          DownloadTable(prodList);
        }}
        searchColumn="description"
      />
    </div>
  );
}
