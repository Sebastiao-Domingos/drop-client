import EncomendaClienteController from "@/controllers/encomenda/cliente/EncomendaClienteController";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useActionEncomendaCancelar() {
  const controller = new EncomendaClienteController();
  const client = useQueryClient();

  const mutationCancelarEncomenda = useMutation({
    mutationFn: controller.cancelarEncomenda,
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["encomenda"],
      });
    },
  });

  return { mutationCancelarEncomenda };
}

export { useActionEncomendaCancelar };
