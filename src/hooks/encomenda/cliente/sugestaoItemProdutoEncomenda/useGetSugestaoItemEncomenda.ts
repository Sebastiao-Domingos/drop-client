import SugestaoItemEncomendaController, {
  SugestaoEstado,
} from "@/controllers/encomenda/cliente/SugestaoItemEncomendaProdutoController";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function useGetSugestaoItemEncomendaClient(
  estado: SugestaoEstado = "pendente"
) {
  const controller = new SugestaoItemEncomendaController();

  const { data, ...result } = useQuery({
    queryKey: ["sugestao-item-produto-encomenda", estado],
    queryFn: () => controller.listarSugestao(estado),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export { useGetSugestaoItemEncomendaClient };
