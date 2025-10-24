"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import pathnames from "@/lib/files/pathnames.json";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navigation({ username }) {
  const pathName = usePathname();
  const paths = pathName.split("/");
  const [showParam, setShowParam] = useState(false);
  function showParams() {
    if (!showParam) {
      setShowParam(true);
    } else {
      setShowParam(false);
    }
  }
  return (
    <div className="flex flex-row gap-10 items-center justify-between bg-primaria pl-8 pr-8 pt-4 pb-4">
      <div
        className={clsx(
          "flex flex-col gap-2 bg-secundaria text-center w-[190px] border-1 border-primaria p-4 rounded-xl right-4 top-16 absolute",
          {
            block: showParam,
            hidden: !showParam,
          },
        )}
      >
        <span>{username}</span>
        <div className="w-full h-[1px] bg-primaria"></div>
        <span className="flex m-auto text-terciaria cursor-pointer">
          <img src="/navbar/logout.svg" />
          Sair
        </span>
      </div>
      <div className="flex gap-10 items-end">
        <Link href="/home" className="flex flex-row items-center gap-2">
          <Image src="/navbar/logo-hipersenna.svg" width={37} height={26} alt="Logo Hipersenna" />
          <span className="text-base text-secundaria font-semibold">GHS Sistema</span>
        </Link>
        <ul className="flex flex-row items-center gap-4">
          {pathnames.map((path) => {
            return (
              <li key={path.id}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}/${path.path}`}
                  className="flex flex-row mt-1 items-center gap-2"
                >
                  <span
                    className={clsx("text-base text-secundaria font-semibold hover:text-gray-400 pb-0", {
                      "shadow-underline hover:shadow-underline-hover": paths[paths.length - 1] === path.id,
                    })}
                  >
                    {path.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="flex flex-col justify-between w-[25px] h-[20px] cursor-pointer" onClick={showParams}>
        <div
          className={clsx("h-[2px] w-full bg-secundaria", {
            "rotate-[45deg] translate-y-[10px]": showParam,
          })}
        ></div>
        <div
          className={clsx("h-[2px] w-full bg-secundaria", {
            hidden: showParam,
            block: !showParam,
          })}
        ></div>
        <div
          className={clsx("h-[2px] w-full bg-secundaria", {
            "rotate-[-45deg] translate-y-[-8px]": showParam,
          })}
        ></div>
      </button>
    </div>
  );
}
