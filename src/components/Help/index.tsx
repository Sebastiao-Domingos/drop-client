"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface HelpLink {
  name: string;
  href: string;
}
const listHelp: HelpLink[] = [
  {
    name: "Contacte-nos",
    href: "/contactus",
  },
  {
    name: "Condições de utilização",
    href: "/condicoesutilizacao",
  },
  {
    name: "Custos de envio",
    href: "/custoenvio",
  },
  {
    name: "Integração de Proddutos",
    href: "#",
  },
  {
    name: "Localizar Encomendas",
    href: "#",
  },
  {
    name: "Perguntas Frequentes",
    href: "/perguntasfrequente",
  },
  {
    name: "Âmbito de atuação",
    href: "#",
  },
  {
    name: "Pagamentos",
    href: "/infopayment",
  },
];

interface HelpModalProps {
  children: React.ReactNode;
  setOpenModal?: (status: boolean) => void;
}
export default function HelpModal({ children, setOpenModal }: HelpModalProps) {
  const router = useRouter();
  return (
    <DropdownMenu.Root
      onOpenChange={(visible) => {
        if (setOpenModal) setOpenModal(visible);
      }}
    >
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={twMerge(
            "absolute top-[16px] -left-[155px] w-[180px] border dark:border-gray-500/30 bg-white dark:bg-gray-900 rounded shadow z-50"
          )}
        >
          <div>
            <ul>
              {listHelp.map((item) => (
                <li
                  key={item.name}
                  className={twMerge(
                    "p-3 border-b border-b-gray-500/30 last:border-b-0 cursor-pointer hover:bg-primary/30 hover:text-white /hover:last:border-transparent ease-in duration-150"
                  )}
                >
                  <DropdownMenu.Item
                    className="outline-none text-xs"
                    onClick={() => router.push(item.href)}
                  >
                    {item.name}
                  </DropdownMenu.Item>
                </li>
              ))}
            </ul>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
