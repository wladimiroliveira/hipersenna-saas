"use client";
import { useState } from "react";
import { ValidityFilter } from "@/components/views/filterValidity.view";
import { DataTable } from "@/app/(pages)/(main)/modulos/vencimento/analise/datatable";
import { columns } from "@/app/(pages)/(main)/modulos/vencimento/analise/columns";
import { DownloadTable } from "@/components/services/xlsxHandler.service";
import { searchProd } from "@/components/services/searchProd.service";
import { getValidities } from "@/components/services/validity.service";

export function ValidityAnylises() {
  const [prodDesc, setProdDesc] = useState("Consulte o produto...");
  const [prodCod, setProdCod] = useState();
  const [loadingProdDesc, setLoadingProdDesc] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);
  const [prodList, setProdList] = useState([]);

  async function handleSearchProdDesc(data) {
    try {
      setLoadingProdDesc(true);
      if (!data[0].id || !data[0].type) {
        return;
      }
      const queryValue = await searchProd(data[0].id, data[0].type);
      queryValue[0].descricao ? setProdDesc(queryValue[0].descricao) : setProdDesc("Produto não encontrado");
      queryValue[0].codProd && setProdCod(queryValue[0].codProd);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoadingProdDesc(false);
    }
  }

  async function handleSubmit(data) {
    try {
      setMainLoading(true);
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
        onSearchProd={handleSearchProdDesc}
        onSubmitData={handleSubmit}
        loading={loadingProdDesc}
        mainLoading={mainLoading}
      />
      <DataTable
        columns={columns}
        data={prodList}
        downloadable={true}
        downloadTable={() => {
          DownloadTable(prodList);
        }}
        searchColumn="description"
      />
    </div>
  );
}
