"use client";

import { PermissionsView } from "@/components/views/permissions.view";
import { useState } from "react";
import permissionsData from "@/files/permissions.json";
import { getUser } from "@/lib/models/users.model";
import { deleteUserPermissions, getUserPermissions, postUserPermissions } from "@/lib/models/permissions.model";

export function PermissionsController() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);

  async function searchUser(data) {
    try {
      setLoading(true);
      const userValue = await getUser(data[0].modalityUser, data[0].userId);
      const userPermissionValue = await getUserPermissions(userValue.user?.id);
      if (Array.isArray(userPermissionValue.permissions)) {
        setUserPermissions(userPermissionValue.permissions);
      } else {
        setPermissionMessage(userPermissionValue.permissions);
      }
      if (userValue.ok) {
        setUserInfo(userValue.user);
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
    await postUserPermissions(userInfo.id, data.permissions);
    const userPermissionValue = await getUserPermissions(userInfo.id);
    setUserPermissions(userPermissionValue.permissions);
  }
  async function removePermissions(data) {
    await deleteUserPermissions(userInfo.id, data.permissions);
    const userPermissionValue = await getUserPermissions(userInfo.id);
    setUserPermissions(userPermissionValue.permissions);
  }

  return (
    <div>
      <PermissionsView
        onSearchUser={searchUser}
        onSendPermissions={sendPermissions}
        onRemovePermissions={removePermissions}
        loading={loading}
        permissions={permissionsData}
        username={userInfo?.name}
        showPermissions={showPermissions}
        userPermissions={userPermissions}
        permissionMessage={permissionMessage}
      />
    </div>
  );
}
