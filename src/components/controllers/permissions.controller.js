"use client";

import { PermissionsView } from "@/components/views/permissions.view";
import { useEffect, useState } from "react";
import { getUser } from "@/components/services/users.service";
import {
  deleteUserPermissions,
  getUserPermissions,
  postUserPermissions,
} from "@/components/services/permissions.service";
import { getPermissions } from "@/components/services/getPermissions.service";

export function PermissionsController() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    async function handleGetPermissions() {
      const permissionsValue = await getPermissions();
      setPermissions(permissionsValue.permissions);
    }
    handleGetPermissions();
  }, []);

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
        permissions={permissions}
        username={userInfo?.name}
        showPermissions={showPermissions}
        userPermissions={userPermissions}
        permissionMessage={permissionMessage}
      />
    </div>
  );
}
