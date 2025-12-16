import { ValidityAnylises } from "@/components/controllers/validity.controller";

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
        <ValidityAnylises />
      </div>
    </div>
  );
}
