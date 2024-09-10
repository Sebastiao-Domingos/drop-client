import { NotificationData } from "@/services/notificacoes";

function sugestao(notificacao: NotificationData) {
  switch (notificacao.acao) {
    case "confirmou menos":
      return  "O fornecedor do nome tal, confirmou com uma qunatidade menos em relação a quantidade sugerida.";

    default:
      return notificacao.recurso;
  }
}

export { sugestao};
