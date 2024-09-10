import SugestaoItemEncomendaController from "@/controllers/encomenda/cliente/SugestaoItemEncomendaProdutoController";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useActionSugestaoItemProdutoEncomendaClient() {
  const controller = new SugestaoItemEncomendaController();
  const queryClient = useQueryClient();

  const mutationValidate = useMutation({
    mutationKey: ["sugestao-item-produto-encomenda"],
    mutationFn: controller.validate,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["sugestao-item-produto-encomenda"],
      });
    },
  });

  return { mutationValidate };
}

export { useActionSugestaoItemProdutoEncomendaClient };
