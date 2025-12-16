"use client";

import Image from "next/image";
import { RegisterCupomContainer } from "@/components/views/registerCupom.view";
import { SearchNumbers } from "@/components/services/searchNumbers.service";
import { Navbar } from "@/components/views/navbar.view";
import { useState } from "react";
import clsx from "clsx";
import LoadingThreeDotsJumping from "@/components/animations/jumpingDots.animation";

export default function Page() {
  // const [openScanner, setOpenScanner] = useState(false);
  const [loading, setLoading] = useState(false);

  // function handleOpenScanner(bool) {
  //   setOpenScanner(bool);
  // }

  function handleStartLoading(bool) {
    setLoading(bool);
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={clsx("flex fixed h-full w-full bg-gray-400/50 backdrop-blur-sm left-0 top-0 transition-all", {
          "opacity-0 pointer-events-none": !loading,
          "opacity-100 pointer-events-auto": loading,
        })}
      >
        <LoadingThreeDotsJumping />
      </div>
      <div className="mb-4">
        <Navbar />
      </div>
      <Image
        className={clsx("w-[363px] h-[328px] rounded-sm")}
        src="/art-image.jpg"
        width={619}
        height={560}
        alt="Art festival tvs"
      />
      <h1 className="text-xl font-bold">Cadastre seu cupom abaixo</h1>
      <div className="flex flex-col gap-4">
        {/* <div>
          <ScannerModel openScanner={openScanner} onOpenScanner={handleOpenScanner} onLoading={handleStartLoading} />
        </div> */}
        <div>
          <RegisterCupomContainer onLoading={handleStartLoading} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">Contulte seus números da sorte</h2>
        <SearchNumbers />
      </div>
    </div>
  );
}
