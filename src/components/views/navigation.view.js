"use client";

import { SignOutButton } from "@/components/views/signOutButton.view";
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
import { LogOut, UserCircle2Icon } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { usePathname } from "next/navigation";

export function Navigation() {
  const { user } = useUserStore.getState();
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-10 items-center justify-center bg-primaria pl-8 pr-8 pt-4 pb-4">
      <div className="flex w-full max-w-7xl items-center justify-between">
        <Link href="" className="flex flex-row items-center gap-2">
          <Image src="/navbar/logo-hipersenna.svg" width={37} height={26} alt="Logo Hipersenna" />
        </Link>
        <ul className="flex flex-row items-center gap-8">
          {pathnames ? (
            pathnames
              .filter((path) => {
                const hasPermission = user?.permissions
                  ? path?.permissions.some((p) => user?.permissions.includes(p))
                  : false;
                let isPublic;
                if (path?.permissions.length === 0) {
                  isPublic = true;
                } else {
                  isPublic = false;
                }
                return isPublic || hasPermission;
              })
              .map((path) => (
                <li key={path?.id}>
                  <Link href={path?.path} className="flex flex-row mt-1 items-center justify-center gap-2">
                    <span
                      className={clsx("transition-colors text-sm text-secundaria  hover:text-gray-400 pb-0", {
                        "shadow-underline hover:shadow-underline-hover":
                          pathname.split("/")[2] === path?.id || pathname.split("/")[1] === path?.id,
                      })}
                    >
                      {path?.name}
                    </span>
                  </Link>
                </li>
              ))
          ) : (
            <></>
          )}
        </ul>
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-secundaria hover:text-primaria">
                <UserCircle2Icon className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-primaria" align="end">
              <DropdownMenuLabel className="flex items-end justify-center gap-2">
                {user?.username || "usuario"}
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
      </div>
    </div>
  );
}
