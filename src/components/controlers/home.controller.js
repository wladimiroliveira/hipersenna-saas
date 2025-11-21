"use client";

import { ModulesContainer } from "@/components/views/modulesContainer.view";
import modules from "@/lib/files/modules.json";
import { useState } from "react";

export function HomeController() {
  const [userInfo, setUserInfo] = useState([]);
  try {
    // const userInfoResult = await fetch("/api/v1/users/getuser");
    // console.log(userInfoResult);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return <ModulesContainer title="Módulos" modules={modules} userRole={1} />;
}
