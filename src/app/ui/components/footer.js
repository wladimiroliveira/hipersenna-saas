import Link from "next/link";

export function Footer() {
  return (
    <div className="flex justify-between border-t-1 border-primaria p-4 ml-4 mr-4 pt-6 pb-6">
      <ul className="flex flex-row gap-8">
        <li>
          <Link href="#" className="text-base font-semibold text-primaria uppercase">
            Contato
          </Link>
        </li>
        <li>
          <Link href="#" className="text-base font-semibold text-primaria uppercase">
            Sobre
          </Link>
        </li>
        <li>
          <Link href="#" className="text-base font-semibold text-primaria uppercase">
            Ajuda
          </Link>
        </li>
      </ul>
      <div>
        <p className="uppercase font-semibold">
          Criado por:{" "}
          <Link
            href="https://github.com/wladimiroliveira"
            target="_blank"
            className="font-light transition-shadow hover:shadow-underline-primaria"
          >
            Wladimir Oliveira
          </Link>{" "}
          &{" "}
          <Link
            href="https://github.com/glhalton"
            target="_blank"
            className="font-light transition-shadow hover:shadow-underline-primaria"
          >
            Glhalton Amaro
          </Link>
        </p>
      </div>
    </div>
  );
}
