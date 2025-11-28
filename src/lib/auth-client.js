"use client";

import { useEffect, useState } from "react";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/v1/users/me", {
        cache: "no-store",
      });
      const data = await res.json();
      setUserInfo(data);
    }

    loadData();
  }, []);

  return userInfo;
}
