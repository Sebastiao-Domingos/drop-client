import PagamentoController from "@/controllers/encomenda/pagamento";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useActionPagamento() {
  const controller = new PagamentoController();
  const queryClient = useQueryClient();

  const mutationPagamento = useMutation({
    mutationFn: controller.pagamento,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["encomenda"],
      });
    },
  });

  return { mutationPagamento };
}

export { useActionPagamento };
