"use client";

import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import SugestaoContainer from "./SugestaoContainer";
import * as Tabs from "@radix-ui/react-tabs";

function SugestionClient() {
  return (
    <div>
      <div className="mb-10">
        <div>
          <Breadcrumb className="text-[12px] md:text-sm">
            <BreadcrumbItem href="/user/perfil" name="A minha conta" />
            <BreadcrumbItem
              href="/user/sugestion"
              name="Sugestões de produtos"
            />
          </Breadcrumb>
        </div>
        <h2 className="uppercase font-bold mb-3">Sugestões de produtos</h2>
        <p className="text-sm italic">
          Gerencie os produtos sugeridos das suas encomendas
        </p>
      </div>
      <Tabs.Root className="w-full mt-10" defaultValue="pendente">
        <Tabs.List className="border-b dark:border-b-gray-800 overflow-auto flex flex-nowrap">
          <Tabs.Trigger
            value="pendente"
            className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]=font-bold data-[state=active]:text-primary"
          >
            Pendente
          </Tabs.Trigger>
          <Tabs.Trigger
            value="aprovado"
            className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-primary"
          >
            Aprovada
          </Tabs.Trigger>
          <Tabs.Trigger
            value="negado"
            className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-primary"
          >
            Negado
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="pendente" className="mt-6">
          <SugestaoContainer estado="pendente" />
        </Tabs.Content>
        <Tabs.Content value="aprovado" className="mt-6">
          <SugestaoContainer estado="aprovado" />
        </Tabs.Content>
        <Tabs.Content value="negado" className="mt-6">
          <SugestaoContainer estado="negado" />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default SugestionClient;
