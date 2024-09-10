import PaymentController from "@/controllers/cliente/pagamento";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new PaymentController();
function useActionPayment() {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: controller.efectuarPagamento,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cliente"] });
    },
  });
  return { mutationCreate };
}

export { useActionPayment };
