"use client";

import { SignOutButton } from "@/lib/models/signOutButton.model";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import pathnames from "@/files/pathnames.json";
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
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/user.store";

export function Navigation() {
  return (
    <div className="flex flex-row gap-10 items-center justify-between bg-primaria pl-8 pr-8 pt-4 pb-4">
      <div className="flex gap-10 items-end">
        <Link href="" className="flex flex-row items-center gap-2">
          <Image src="/navbar/logo-hipersenna.svg" width={37} height={26} alt="Logo Hipersenna" />
          <span className="text-base text-secundaria font-semibold">GHS Sistema</span>
        </Link>
        {/* <ul className="flex flex-row items-center gap-4">
          {pathnames
            .filter((path) => {
              const hasPermission = user.permissions
                ? path.permissions.some((p) => user.permissions.includes(p))
                : false;
              const hasRole = user.role_id ? path.roles.includes(user.role_id) : false;
              let isPublic;
              if (path.roles.length === 0 && path.permissions.length === 0) {
                isPublic = true;
              } else {
                isPublic = false;
              }
              return isPublic || hasRole || hasPermission;
            })
            .map((path) => (
              <li key={path.id}>
                <Link href={path.path} className="flex flex-row mt-1 items-center gap-2">
                  <span
                    className={clsx(
                      "transition-colors text-base text-secundaria font-semibold hover:text-gray-400 pb-0",
                      {
                        "shadow-underline hover:shadow-underline-hover":
                          pathName.split("/")[2] === path.id || pathName.split("/")[1] === path.id,
                      },
                    )}
                  >
                    {path.name}
                  </span>
                </Link>
              </li>
            ))}
        </ul> */}
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-secundaria hover:text-primaria">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-primaria" align="end">
          <DropdownMenuLabel className="flex items-end justify-center gap-2">
            <User className="w-5" />
            {"usuario"}
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
