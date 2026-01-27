"use client";

import { useState } from "react";
import { searchProd } from "../services/searchProd.service";
import { InsercaoVencimentoForm } from "../views/insercaoVencimento.view";
import { toast } from "sonner";
import { DataTable } from "@/app/(pages)/(main)/modulos/vencimento/insercao/datatable";
import { columns } from "@/app/(pages)/(main)/modulos/vencimento/insercao/column";

export function InsercaoVencimentoController() {
  const [searchProdLoading, setSearchProdLoading] = useState(false);
  const [insertProdLoading, setInsertProdLoading] = useState(false);
  const [data, setData] = useState([]);
  const [prod, setProd] = useState(false);

  const handleSearchProd = async (prodMod, codprod) => {
    try {
      setSearchProdLoading(true);
      if (!prodMod || !codprod) {
        toast.error("Erro", {
          description: "Insira algum código no campo produto",
          action: {
            label: "Ok",
          },
        });
        return;
      }
      const responseValue = await searchProd(codprod, prodMod);
      if (Array.isArray(responseValue) && responseValue?.length > 0) {
        setProd({
          descricao: responseValue[0].descricao,
          codprod: responseValue[0].codProd,
          codAuxiliar: responseValue[0].codAuxiliar,
        });
      }
      if (Array.isArray(responseValue) && responseValue?.length === 0) {
        toast.warning("Produto não encontrado", {
          action: {
            label: "Ok",
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearchProdLoading(false);
    }
  };

  const handleSubmitInfos = (currentData) => {
    try {
      setInsertProdLoading(true);
      setProd(false);
      if (Array.isArray(data) && data?.length === 0) {
        setData([
          {
            branch_id: currentData?.branch_id,
            codprod: currentData?.codprod,
            description: prod?.descricao,
            validity_date: new Date(currentData?.dataValidade).toLocaleDateString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            quantity: currentData?.quant,
          },
        ]);
      } else if (Array.isArray(data) && data?.length > 0) {
        setData([
          ...data,
          {
            branch_id: currentData?.branch_id,
            codprod: currentData?.codprod,
            description: prod?.descricao,
            validity_date: new Date(currentData?.dataValidade).toLocaleDateString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            quantity: currentData?.quant,
          },
        ]);
      }
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setInsertProdLoading(false);
    }
  };

  return (
    <div className="flex-1 gap-4 flex w-full">
      <InsercaoVencimentoForm
        handleSubmitInfos={handleSubmitInfos}
        handleSearchProd={handleSearchProd}
        prod={prod}
        loadings={{ searchProdLoading, insertProdLoading }}
        prodList={data}
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
