"use client";

import { useState } from "react";
import { searchProd } from "../services/searchProd.service";
import { InsercaoVencimentoForm } from "../views/insercaoVencimento.view";
import { toast } from "sonner";
import { DataTable } from "@/app/(pages)/(main)/modulos/vencimento/insercao/datatable";
import { columns } from "@/app/(pages)/(main)/modulos/vencimento/insercao/columns";
import { postValidities } from "../services/validity.service";

export function InsercaoVencimentoController() {
  const [searchProdLoading, setSearchProdLoading] = useState(false);
  const [insertProdLoading, setInsertProdLoading] = useState(false);
  const [sendProdLoading, setSendProdLoading] = useState(false);
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
            auxiliary_code: prod?.codAuxiliar,
            description: prod?.descricao,
            validity_date: new Date(currentData?.dataValidade),
            quantity: currentData?.quant,
          },
        ]);
      } else if (Array.isArray(data) && data?.length > 0) {
        setData([
          ...data,
          {
            branch_id: currentData?.branch_id,
            codprod: currentData?.codprod,
            auxiliary_code: prod?.codAuxiliar,
            description: prod?.descricao,
            validity_date: new Date(currentData?.dataValidade),
            quantity: currentData?.quant,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setInsertProdLoading(false);
    }
  };

  const handleRemoveRows = (idxRemove) => {
    const result = data.filter((_, index) => !idxRemove.includes(index));
    setData(result);
  };

  const handleSendProducts = async (products) => {
    try {
      setSendProdLoading(true);
      const payload = {
        branch_id: Number(products[0]?.branch_id),
        request_id: null,
        products: products.map((product) => ({
          product_code: Number(product?.codprod),
          auxiliary_code: product?.auxiliary_code,
          quantity: Number(product?.quantity),
          validity_date: product?.validity_date,
        })),
      };
      const responseValue = await postValidities(payload);
      if (responseValue?.status === 201) {
        toast.success("Sucesso", {
          description: "Vencimento enviado com sucesso",
        });
        setData([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendProdLoading(false);
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
      <DataTable
        columns={columns}
        data={data}
        handleRemoveRows={handleRemoveRows}
        handleSendProducts={handleSendProducts}
        loadings={{ sendProdLoading }}
      />
    </div>
  );
}
