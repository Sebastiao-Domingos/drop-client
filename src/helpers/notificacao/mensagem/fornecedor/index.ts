import { NotificationData } from "@/services/notificacoes";

function sugestao(notificacao: NotificationData) {
  switch (notificacao.acao) {
    case "aprovou":
      return  "A sua sugestão de stock foi aprovado com sucesso. Agora podes ir na página de stocks, para atualizar a quantidade.";
    case "negou" : 
      return  "A sua sugestão de stock foi anegada."
    default:
      return notificacao.recurso;
  }
}

export { sugestao};
