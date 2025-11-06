"use client";
import { useState } from "react";
import { ValidityFilter } from "@/components/views/filterValidity.view";

export function ValidityAnylises() {
  const [prodDesc, setProdDesc] = useState("Consulte o produto...");
  const [prodKey, setProdKey] = useState(1);
  const [loadingProdDesc, setLoadingProdDesc] = useState(false);

  async function handleSearchProdDesc(data) {
    try {
      setLoadingProdDesc(true);
      setProdKey((prev) => prev + 1);
      setProdDesc(`Descrição do produto ${prodKey}`);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoadingProdDesc(false);
    }
  }

  async function handleSubmit(data) {
    console.log(data);
  }

  return (
    <div>
      <ValidityFilter
        prodDesc={prodDesc}
        onSearchProd={handleSearchProdDesc}
        onSubmitData={handleSubmit}
        loading={loadingProdDesc}
      />
    </div>
  );
}
