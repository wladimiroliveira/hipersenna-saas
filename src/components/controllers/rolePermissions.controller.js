"use client";

import { PermissionsView, RolePermissionsView } from "@/components/views/rolePermissions.view";
import { getPermissions } from "../services/getPermissions.service";
import { getRole, getRoles } from "../services/role.service";
import { useEffect, useState } from "react";
import { deleteRolePermissions, getRolePermissions, postRolePermissions } from "../services/rolePermissions.service";
export function RolePermissionsController() {
  const [loading, setLoading] = useState(false);
  const [roleInfo, setRoleInfo] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [permissionsMessage, setPermissionsMessage] = useState(false);
  const [rolePermissions, setRolePermissions] = useState(false);

  useEffect(() => {
    async function handleGetPermissions() {
      const permissionsValue = await getPermissions();
      setPermissions(permissionsValue?.permissions);
    }
    handleGetPermissions();
  }, []);

  async function searchRole(data) {
    try {
      setLoading(true);
      const roleValue = await getRole(data);
      const rolePermissionsValue = await getRolePermissions({ id: roleValue?.role[0]?.id });
      if (Array.isArray(rolePermissionsValue?.permissions)) {
        setRolePermissions(rolePermissionsValue?.permissions);
      } else {
        setPermissionsMessage(rolePermissionsValue?.permissions);
      }
      if (roleValue?.ok) {
        setRoleInfo(roleValue?.role[0]);
        setShowPermissions(true);
      } else {
        setRoleInfo(false);
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
    await postRolePermissions(roleInfo?.id, data?.permissions);
    const rolePermissionsValue = await getRolePermissions({ id: roleInfo?.id });
    setRolePermissions(rolePermissionsValue?.permissions);
  }

  async function removePermissions(data) {
    await deleteRolePermissions(roleInfo?.id, data?.permissions);
    const rolePermissionsValue = await getRolePermissions({ id: roleInfo?.id });
    setRolePermissions(rolePermissionsValue?.permissions);
  }

  return (
    <div>
      <RolePermissionsView
        onSearchRole={searchRole}
        onSendPermissions={sendPermissions}
        onRemovePermissions={removePermissions}
        loading={loading}
        permissions={permissions}
        roleName={roleInfo?.name}
        showPermissions={showPermissions}
        rolePermissions={rolePermissions}
        permissionsMessage={permissionsMessage}
      />
    </div>
  );
}
