"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mapa de traduções: slug -> nome amigável
const labelMap: Record<string, string> = {
  home: "Home",
  admin: "Admin",
  conhecimento: "Conhecimento",
  frentecaixa: "Frente de caixa",
  aberturacaixa: "Abertura de caixa",
  fechamentocaixa: "Fechamento de caixa",
  estoque: "Estoque",
  recebermercadoria: "Recebimento de mercadoria",
  organizarestoque: "Organização de estoque",
  vencimento: "Vencimento",
  user: "User",
  create: "Create",
};

function formatLabel(part: string): string {
  return labelMap[part] || part.charAt(0).toUpperCase() + part.slice(1);
}

export function Navigation() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="p-1">
      <BreadcrumbList>
        {/* Página inicial */}

        <BreadcrumbItem className="cursor-default">
          ...
        </BreadcrumbItem>

        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;
          const label = formatLabel(decodeURIComponent(part));

          return (
            <BreadcrumbItem key={href}>
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}