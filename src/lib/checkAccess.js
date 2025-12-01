"use client";

import { useRouter } from "next/navigation";

export function useCheckAccess(modules, permissions, role) {
  try {
    const router = useRouter();
    const hasAccess = modules.some((module) => {
      const isPublic = module.roles.length === 0 && module.permissions.length === 0;
      const hasPermission =
        permissions || permissions.length > 0 ? module.permissions.some((p) => permissions.includes(p)) : false;
      const hasRole = permissions || permissions.length > 0 ? module.roles.includes(role) : false;
      return isPublic || hasRole || hasPermission;
    });

    if (!hasAccess) {
      router.back();
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
