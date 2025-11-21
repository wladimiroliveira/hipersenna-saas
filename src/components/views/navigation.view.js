"use client";

import { useEffect, useState } from "react";
import { SignOutButton } from "@/components/models/signOutButton.model";
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
  const [userInfo, setUserInfo] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    async function fetchSession() {
      let userInfoValue;
      let userPermissionsValue;
      let userRoleValue;
      try {
        const userInfoResult = await fetch("/api/v1/users/me");
        userInfoValue = await userInfoResult.json();
        const userPermissionsResult = await fetch(`/api/v1/permissions?id=${userInfoValue[0].id}`);
        const userRoleResult = await fetch(`/api/v1/users/getuser?id=${userInfoValue[0].id}`);
        userPermissionsValue = await userPermissionsResult.json();
        userRoleValue = await userRoleResult.json();
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        if (userInfoValue[0].status === 200) {
          setUserInfo([
            {
              id: userInfoValue[0].id,
              name: userInfoValue[0].name,
              username: userInfoValue[0].username,
              branch_id: userInfoValue[0].branch_id,
              winthor_id: userInfoValue[0].winthor_id,
            },
          ]);
        }
        if (userRoleValue[0].status === 200) {
          setUserRole([userRoleValue[0].user[0].hsusers_roles[0].role_id]);
        }
        if (userPermissionsValue[0].status === 200) {
          const permissions = userPermissionsValue[0].permissions.map((permission) => permission.permission_id);
          setUserPermissions(permissions);
        }
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
          {pathnames.map((path) => {
            if (path.roles.lenght > 1 || path.permissions.length > 1) {
              const interPermissions = path.permissions.filter((permission) => userPermissions.includes(permission));
              if (path.roles.includes(userRole[0]) || interPermissions.lenght > 0) {
                return (
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
                );
              }
            } else {
              return (
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
              );
            }
          })}
          {/* pathnames.map((path) => (
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
          )) */}
        </ul>
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
            {userInfo[0]?.username}
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
