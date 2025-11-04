import { ValidityFilter } from "@/components/views/filter.view";

export default function Page() {
  return (
    <div
      className="pl-4 pr-4"
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <div className="pt-12 pb-12">
        <h1 className="text-4xl text-primaria font-bold">Análise de Vencimento</h1>
      </div>
      <div>
        <ValidityFilter />
      </div>
    </div>
  );
}
