"use client";

import { useState } from "react";
import { FieldGroup, FieldSet } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
  MoveLeftIcon,
  SearchIcon,
  SquareChevronLeftIcon,
  SquareChevronRightIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import clsx from "clsx";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

export function RolePermissionsView({
  onSearchRole,
  onSendPermissions,
  onRemovePermissions,
  loading,
  permissions,
  rolePermissions,
  roleName,
  showPermissions,
  permissionsMessage,
}) {
  async function searchRolePermissions(data) {
    onSearchRole(data);
  }

  async function sendPermissions(data) {
    onSendPermissions(data);
  }

  async function removePermissions(data) {
    onRemovePermissions(data);
  }
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SearchRolePermissions onSearchPermissions={searchRolePermissions} loading={loading} />
      </div>
      <div>
        <PermissionsContainer
          permissions={permissions}
          userPermissions={rolePermissions}
          username={roleName ? roleName : ""}
          showPermissions={showPermissions}
          onSendPermissions={sendPermissions}
          onRemovePermissions={removePermissions}
          permissionsMessage={permissionsMessage}
        />
      </div>
    </div>
  );
}

export function SearchRolePermissions({ onSearchPermissions, loading }) {
  const [searchModality, setSearchModality] = useState("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
  } = useForm({
    defaultValues: {
      searchModality: "id",
    },
  });

  const searchRole = (data) => {
    onSearchPermissions(data);
  };

  return (
    <form onSubmit={handleSubmit(searchRole)}>
      <FieldSet className="gap-2 flex-row sm:max-w-[40%]">
        <FieldGroup className="flex-row gap-2">
          <Controller
            name="searchModality"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(e) => {
                  console.log(e);
                  field.onChange(e);
                  setSearchModality(e);
                  resetField("searchParam");
                }}
                value={field.value}
                modal={false}
              >
                <SelectTrigger>
                  <FilterIcon />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">ID do Usuário</SelectItem>
                  <SelectItem value="name">Nome do Cargo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Input
            id="searchParam"
            type={searchModality === "id" ? "number" : "text"}
            placeholder={searchModality === "id" ? "ID do cargo" : "Nome do cargo"}
            {...register("searchParam")}
            required
          />
        </FieldGroup>
        <Button disabled={loading}>{loading ? <Spinner /> : <SearchIcon />}</Button>
      </FieldSet>
    </form>
  );
}

export function PermissionsContainer({
  permissions,
  userPermissions,
  permissionMessage,
  username,
  showPermissions,
  onSendPermissions,
  onRemovePermissions,
}) {
  const { control: sendControl, watch: watchSend, reset } = useForm();
  const { control: removeControl, watch: watchRemove } = useForm();

  function handleSend() {
    const values = watchSend();
    const trueKeys = Object.entries(values)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);
    const numbers = trueKeys.map((key) => {
      const id = key.split(" ");
      return Number(id[1]);
    });
    if (trueKeys.length > 0) {
      onSendPermissions({ direction: "leftToRight", permissions: numbers });
      reset();
    }
  }

  function handleRemove() {
    const values = watchRemove();
    const trueKeys = Object.entries(values)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);
    const numbers = trueKeys.map((key) => {
      const id = key.split(" ");
      return Number(id[1]);
    });
    if (trueKeys.length > 0) {
      onRemovePermissions({ direction: "rightToLeft", permissions: numbers });
    }
  }
  function findPermissionName(id, array) {
    const item = array.find((element) => element.id === id);
    return item ? item.name : null;
  }
  return (
    <div
      className={clsx("flex flex-col h-100 pt-4 pb-4", {
        hidden: showPermissions === false,
        block: showPermissions === true,
      })}
    >
      <div className="h-auto pt-2 pb-2">
        <h2 className="text-lg font-semibold capitalize">{username}</h2>
      </div>
      <div className="flex flex-row h-100">
        <form className="flex flex-row flex-1 min-h-0 w-full">
          <div className="flex flex-col border-1  gap-2 rounded-md p-2 pt-4 pb-4 overflow-y-scroll min-h-0 flex-1">
            {permissions ? (
              permissions.map((permission) => (
                <Controller
                  key={"permission" + permission.id}
                  name={`${"p " + permission.id}`}
                  control={sendControl}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex gap-2 items-center">
                      <Checkbox id={String(permission.id)} checked={field.value} onCheckedChange={field.onChange} />
                      <Label htmlFor={String(permission.id)}>
                        {permission.id} - {permission.name}
                      </Label>
                    </div>
                  )}
                />
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-center gap-4 h-full p-2">
            <Button variant="outline" type="button" onClick={handleSend}>
              <ArrowRightIcon />
            </Button>
          </div>
        </form>
        <form className="flex flex-row flex-1 min-h-0 w-full">
          <div className="flex flex-col justify-center gap-4 h-full p-2">
            <Button variant="outline" type="button" onClick={handleRemove}>
              <ArrowLeftIcon />
            </Button>
          </div>
          <div className="flex flex-col border-1 gap-2 rounded-md p-2 pt-4 pb-4 overflow-y-scroll min-h-0 flex-1">
            {Array.isArray(userPermissions) && userPermissions.length > 0 ? (
              userPermissions
                .sort((a, b) => a - b)
                .map((permission) => (
                  <Controller
                    key={"userPermission" + permission}
                    name={`${"uP " + permission}`}
                    control={removeControl}
                    defaultValue={false}
                    render={({ field }) => (
                      <div className="flex gap-2 items-center">
                        <Checkbox id={String(permission)} checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor={String(permission)}>
                          {permission} - {findPermissionName(permission, permissions)}
                        </Label>
                      </div>
                    )}
                  />
                ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-center">{permissionMessage}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
