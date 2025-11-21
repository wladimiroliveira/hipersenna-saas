import { HomeController } from "@/components/controlers/home.controller";

export default async function Page() {
  return (
    <div className="pl-8 pr-8">
      <div className="flex items-center justify-center" style={{ height: "calc(50vh - 60px)" }}>
        <h1 className="text-center text-4xl text-primaria">
          Bem Vindo(a) ao <br />
          <strong>GHS Sistema</strong>
        </h1>
      </div>
      <HomeController />
    </div>
  );
}
