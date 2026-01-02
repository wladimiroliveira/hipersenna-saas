"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRolesStore = create(
  persist(
    (set) => ({
      roles: null,

      setRoles: (data) => set({ roles: data }),

      clearRoles: () => set({ roles: null }),
    }),
    {
      name: "roles-info",
      getStorage: () => (typeof window !== "undefined" ? localStorage : undefined),
      partialize: (state) => ({ roles: state.roles }),
    },
  ),
);
