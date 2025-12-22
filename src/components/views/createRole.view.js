import { FieldSet } from "../ui/field";

export function CreateRole() {
  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <FieldSet></FieldSet>
    </form>
  );
}
