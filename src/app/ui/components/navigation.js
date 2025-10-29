"use client";

import { useEffect, useState } from "react";
import { SignOutButton } from "./signOutButton";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import pathnames from "@/lib/files/pathnames.json";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User } from "lucide-react";

export function Navigation() {
  const pathName = usePathname();
  const [username, setUsername] = useState([]);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
      }
    }
    fetchSession();
  }, []);

  return (
    <div className="flex flex-row gap-10 items-center justify-between bg-primaria pl-8 pr-8 pt-4 pb-4">
      <div className="flex gap-10 items-end">
        <Link href="/home" className="flex flex-row items-center gap-2">
          <Image src="/navbar/logo-hipersenna.svg" width={37} height={26} alt="Logo Hipersenna" />
          <span className="text-base text-secundaria font-semibold">GHS Sistema</span>
        </Link>
        <ul className="flex flex-row items-center gap-4">
          {pathnames.map((path) => (
            <li key={path.id}>
              <Link href={path.path} className="flex flex-row mt-1 items-center gap-2">
                <span
                  className={clsx(
                    "transition-colors text-base text-secundaria font-semibold hover:text-gray-400 pb-0",
                    {
                      "shadow-underline hover:shadow-underline-hover": pathName.split("/")[1] === path.id,
                    },
                  )}
                >
                  {path.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-secundaria hover:text-primaria">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-primaria" align="end">
          <DropdownMenuLabel className="flex items-end justify-center gap-2">
            <User className="w-5" />
            {username}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primaria" />
          <DropdownMenuItem className="flex justify-center">
            <SignOutButton className="flex justify-center p-1 rounded-md transition-colors cursor-pointer gap-2 text-terciaria hover:bg-hover-terciaria w-full">
              <LogOut className="text-terciaria" />
              Sair
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
