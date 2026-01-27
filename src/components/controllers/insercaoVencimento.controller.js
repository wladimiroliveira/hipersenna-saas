"use client";

import { useState } from "react";
import { searchProd } from "../services/searchProd.service";
import { InsercaoVencimentoForm } from "../views/insercaoVencimento.view";
import { toast } from "sonner";

export function InsercaoVencimentoController() {
  const [searchProdLoading, setSearchProdLoading] = useState(false);
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

  return (
    <div>
      <InsercaoVencimentoForm handleSearchProd={handleSearchProd} prod={prod} loadings={{ searchProdLoading }} />
    </div>
  );
}
