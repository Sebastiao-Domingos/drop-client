import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import Table, { TBody, THead, Tr } from "@/components/Table";
import InvoicesTableBody from "./InvoicesTableBody";

function Invoices() {
  return (
    <div>
      <Breadcrumb className="text-sm">
        <BreadcrumbItem href="/user/perfil" name="Minha Conta" />
        <BreadcrumbItem href="/user/invoices" name="Minhas faturas" />
      </Breadcrumb>
      <div>
        <h2 className="uppercase font-bold">As minhas faturas</h2>
      </div>
      <div className="mt-10">
        <div className="py-8 px-4 /bg-white rounded">
          <div className="flex gap-4 items-center bg-primary/20 rounded">
            <span className="md:bg-primary/50 h-full p-2 rounded-l text-white">
              <i className="ri-error-warning-line"></i>
            </span>
            <p className="text-xs">
              Informação: As faturas originais foram enviadas para o email ou
              whatsapp em que foram realizadas a encomendas;
            </p>
          </div>
          <div className="overflow-auto">
            <Table className="text-xs md:text-sm">
              <THead>
                <td className="text-center px-2 md:pl-8 md:text-left">
                  Encomenda
                </td>
                <td className="text-center px-2 md:p-0 md:text-left">
                  Descrição
                </td>
                <td className="text-center px-2 md:p-0 md:text-left">
                  Data de entrega
                </td>
                <td className="text-center px-2 md:p-0 md:text-left">
                  Valor Pago em kz
                </td>
              </THead>
              {<InvoicesTableBody />}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
