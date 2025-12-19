"use client";
import { useState } from "react";
import { ValidityFilter } from "@/components/views/filterValidity.view";
import { DataTable } from "@/components/views/dataTable.view";
import { columns } from "@/app/(main)/modulo/vencimento/analise/columns";
import validities from "@/files/validityData.json";
import { DownloadTable } from "@/components/services/xlsxHandler.service";
import { searchProd } from "@/components/services/searchProd.service";

export function ValidityAnylises() {
  const [prodDesc, setProdDesc] = useState("Consulte o produto...");
  const [prodCod, setProdCod] = useState();
  const [loadingProdDesc, setLoadingProdDesc] = useState(false);
  const [prodList, setProdList] = useState([]);

  function flatList(products) {
    const flatListProducts = products.flatMap((item) =>
      item.hsvalidity_products.map((prod) => ({
        validity_id: prod.validity_id,
        branch_id: item.branch_id,
        created_at: item.created_at,
        modified_at: item.modified_at,
        request_id: item.request_id,
        employee_id: item.employee_id,
        prod_id: prod.id,
        product_cod: prod.product_cod,
        auxiliary_code: prod.auxiliary_code,
        description: prod.description,
        quantity: prod.quantity,
        validity_date: prod.validity_date,
        treat_id:
          prod.treat_id === 1
            ? "Pendente"
            : prod.treat_id === 2
              ? "Colocar em promoção"
              : prod.treat_id === 3
                ? "Troca com o fornecedor"
                : prod.treat_id === 4
                  ? "Transferência interna"
                  : prod.treat_id === 5
                    ? "Bloqueio para venda"
                    : prod.treat_id === 6
                      ? "Doação"
                      : prod.treat_id === 7
                        ? "Vencido"
                        : prod.treat_id === 8
                          ? "Produto vendável dentro do prazo"
                          : prod.treat_id === 9
                            ? "Inserção tardia"
                            : "Tipo inválido",
      })),
    );
    return flatListProducts;
  }

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

  async function handleSubmit(data) {}

  async function handleInputsClear() {
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
