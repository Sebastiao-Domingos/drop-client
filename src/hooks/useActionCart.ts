import CartController from "@/controllers/Cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new CartController();
function useActionCart() {
  const queryClient = useQueryClient();

  const mutationAdicionar = useMutation({
    mutationFn: controller.adicionar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    },
  });

  const mutationRemover = useMutation({
    mutationFn: controller.remover,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    },
  });

  const mutationQuantidade = useMutation({
    mutationFn: controller.actualizarQuantidade,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    },
  });

  return { mutationAdicionar, mutationRemover, mutationQuantidade };
}

export { useActionCart };
