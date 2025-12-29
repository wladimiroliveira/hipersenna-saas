"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
  SearchIcon,
  SquareChevronLeftIcon,
  SquareChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import permissions from "@/files/permissions.json";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

export function PermissionsView({
  onSearchUser,
  onSendPermissions,
  onRemovePermissions,
  loading,
  permissions,
  userPermissions,
  username,
  showPermissions,
  permissionMessage,
}) {
  async function searchUser(data) {
    onSearchUser([data]);
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
        <SearchUserPermission onSubmitData={searchUser} loading={loading} />
      </div>
      <div>
        <PermissionsContainer
          permissions={permissions}
          userPermissions={userPermissions}
          username={username ? username : ""}
          showPermissions={showPermissions}
          onSendPermission={sendPermissions}
          onRemovePermission={removePermissions}
          permissionMessage={permissionMessage}
        />
      </div>
    </div>
  );
}

export function PermissionsContainer({
  permissions,
  userPermissions,
  permissionMessage,
  username,
  showPermissions,
  onSendPermission,
  onRemovePermission,
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
      onSendPermission({ direction: "leftToRight", permissions: numbers });
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
      onRemovePermission({ direction: "rightToLeft", permissions: numbers });
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
          <div className="flex flex-col border-1 gap-2 rounded-md p-2 pt-4 pb-4 overflow-y-scroll min-h-0 flex-1">
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

export function SearchUserPermission({ onSubmitData, loading }) {
  const [userModality, setUserModality] = useState("id");

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    control,
    resetField,
  } = useForm({
    defaultValues: {
      modalityUser: "id",
    },
  });

  const searchUser = (data) => {
    onSubmitData(data);
  };

  return (
    <form onSubmit={onSubmit(searchUser)}>
      <FieldSet className="gap-2 flex-row sm:max-w-[40%]">
        <FieldGroup className="flex-row gap-2">
          <Controller
            name="modalityUser"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                  setUserModality(e);
                  resetField("userId");
                }}
                value={field.value}
                modal={false}
              >
                <SelectTrigger>
                  <FilterIcon />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">ID do Usuário</SelectItem>
                  <SelectItem value="winthor_id">Matrícula</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Input
            id="userId"
            type="number"
            placeholder={userModality === "id" ? "Id do usuário" : "Matrícula do usuário"}
            {...register("userId")}
            required
          />
        </FieldGroup>
        <Button disabled={loading}>{loading ? <Spinner /> : <SearchIcon />}</Button>
      </FieldSet>
    </form>
  );
}
