"use client";

import { PermissionsView } from "@/components/views/permissions.view";
import { useState } from "react";
import permissionsData from "@/lib/files/permissions.json";

export function PermissionsController() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [permissions, setPermissions] = useState(permissionsData);

  async function searchUser(data) {
    try {
      setLoading(true);
      const userResult = await fetch(`/api/v1/users/getuser?${data[0].modalityUser}=${data[0].userId}`);
      const userValue = await userResult.json();
      const userPermissionResult = await fetch(`/api/v1/permissions/?id=${data[0].userId}`);
      const userPermissionValue = await userPermissionResult.json();
      if (userPermissionValue[0].permissions?.message) {
        setPermissionMessage(userPermissionValue[0].permissions?.message);
      } else {
        setUserPermissions(userPermissionValue[0].permissions);
      }
      if (userValue[0].user.length > 0) {
        setUserInfo(userValue[0].user);
        setShowPermissions(true);
      } else {
        setUserInfo([]);
        setShowPermissions(false);
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function sendPermissions(data) {
    const sendPermissionResult = await fetch("/api/v1/permissions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          user_id: userInfo[0]?.id,
          permissions: data.permissions,
        },
      ]),
    });
    console.log(userInfo);
    const userPermissionsResult = await fetch(`/api/v1/permissions/?id=${userInfo[0].id}`);
    const userPermissionValue = await userPermissionsResult.json();
    setUserPermissions(userPermissionValue[0].permissions);
  }
  async function removePermissions(data) {
    const removePermissionResult = await fetch("/api/v1/permissions/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          user_id: userInfo[0]?.id,
          permissions: data.permissions,
        },
      ]),
    });
    const userPermissionsResult = await fetch(`/api/v1/permissions/?id=${userInfo[0].id}`);
    const userPermissionValue = await userPermissionsResult.json();
    setUserPermissions(userPermissionValue[0].permissions);
  }

  return (
    <div>
      <PermissionsView
        onSearchUser={searchUser}
        onSendPermissions={sendPermissions}
        onRemovePermissions={removePermissions}
        loading={loading}
        permissions={permissionsData}
        username={userInfo[0]?.name}
        showPermissions={showPermissions}
        userPermissions={userPermissions}
        permissionMessage={permissionMessage}
      />
    </div>
  );
}
