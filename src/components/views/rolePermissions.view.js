"use client";

import { useState } from "react";
import { PermissionsContainer } from "./userPermissions.view";
import { FieldGroup } from "../ui/field";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { FilterIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function RolePermissionsView({
  onSearchRole,
  onSendPermissions,
  onRemovePermissions,
  loading,
  permissions,
  rolePermissions,
  rolePermissions,
  roleName,
  showPermissions,
  permissionsMessage,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <SearchRolePermissions onSearchPermissions={searchRolePermissions} loading={loading} />
      </div>
      <div>
        <PermissionsContainer
          permissions={permissions}
          rolePermissions={rolePermissions}
          roleName={roleName ? roleName : ""}
          showPermissions={showPermissions}
          onSendPermissions={sendPermissions}
          onRemovePermissions={removePermissions}
          permissionsMessage={permissionsMessage}
        />
      </div>
    </div>
  );
}

export function SearchRolePermissions({ onSearch, loading }) {
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
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(searchRole)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="seatchModality"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                  setSearchModality(e);
                  resetField("searchModality");
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
