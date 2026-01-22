import { InsercaoVencimentoController } from "@/components/controllers/insercaoVencimento.controller";

export default function Page() {
  return (
    <div className="py-4">
      <h1 className="text-xl font-bold py-4">Inserção de Vencimentos</h1>
      <InsercaoVencimentoController />
    </div>
  );
}
