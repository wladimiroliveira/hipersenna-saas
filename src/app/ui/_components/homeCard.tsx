"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ModuleCard(
  {
    title,
    icon,
    href,
    height,
    width,
  }: {
    title: string,
    icon: string,
    href: string,
    height: number,
    width: number,
  }
) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col p-2 justify-between items-center gap-4 border-1 border-secundaria rounded-md h-[158px] bg-primaria">
      <div className="flex item-center h-full">
        <Image
          src={icon}
          alt={`${title} icon`}
          height={height}
          width={width}
        />
      </div>
      <Link
        href={`${pathname}${href}`}
      >
        <Button>
          {title}
        </Button>
      </Link>
    </div>
  );
}