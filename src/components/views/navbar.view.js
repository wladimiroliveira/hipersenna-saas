import { Button } from "@/components/ui/button";
import { IconHome } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between">
      <Button
        className="bg-red-700 hover:bg-red-800"
        onClick={() => {
          router.push("../festival-tv/coleta");
        }}
      >
        <IconHome />
      </Button>
      <Image src="/logo-senna.svg" alt="" height={21.08} width={31} />
    </nav>
  );
}
