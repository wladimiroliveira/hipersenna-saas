import { Label } from "@/components/ui/label";
import { RequestFilter } from "@/components/views/requestFilter.view";

export default function Page() {
  return (
    <div>
      <div className="pt-8 pb-8">
        <h1 className="text-2xl font-bold">Requisição de Vistorias</h1>
      </div>
      <RequestFilter />
    </div>
  );
}
