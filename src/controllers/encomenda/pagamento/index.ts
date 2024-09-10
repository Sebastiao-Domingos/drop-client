import { EncomendaCliente } from "@/services/encomenda";
import { Pagamento } from "@/services/encomenda/pagamento";

class PagamentoController {
  public async pagamento(
    data: Pagamento & { encomenda_id: string }
  ): Promise<EncomendaCliente> {
    const response = await fetch(
      `/api/encomenda/pagamento?encomenda_id=${data.encomenda_id}`,
      {
        body: JSON.stringify({ valor: 0, telefone: data.telefone }),
        method: "POST",
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default PagamentoController;
