"use client";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import * as Tabs from "@radix-ui/react-tabs";

function Devolution() {
  return (
    <div>
      <Breadcrumb className="text-sm">
        <BreadcrumbItem href="/user/perfil" name="Minha Conta" />
        <BreadcrumbItem href="/user/devolution" name="Trocas e devoluções" />
      </Breadcrumb>
      <div>
        <h2 className="uppercase font-bold">Trocas e devoluções</h2>
      </div>

      <div className="w-full">
        <Tabs.Root className="w-full mt-10" defaultValue="devol1">
          <Tabs.List className="border-b overflow-auto flex flex-nowrap">
            <Tabs.Trigger
              value="devol1"
              className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]=font-bold data-[state=active]:text-primary"
            >
              Devolução ativas
            </Tabs.Trigger>
            <Tabs.Trigger
              value="devol2"
              className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-primary"
            >
              Todas
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="devol1">
            <div className="py-8">
              <p className="text-xs md:text-sm">
                Devolução ativas Sem Resultados
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="devol2">
            <div className="py-8">
              <p className="text-xs md:text-sm">
                Todas as devolução Sem Resultados
              </p>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default Devolution;
