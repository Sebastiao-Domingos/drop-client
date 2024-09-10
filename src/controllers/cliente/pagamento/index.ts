import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { PaymentBody } from "@/services/users/pagamento";

class PaymentController {
  public async efectuarPagamento(data: PaymentBody) {
    if (isEmptyString(data.encomenda_id)) {
      throw new Error("O campo do id da encomenda não pode estar vazio!");
    }
    if (isEmptyString(data.info)) {
      throw new Error("O campo da info não pode estar vazio!");
    }

    const response = await fetch("/api/cliente/pagamento", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default PaymentController;
