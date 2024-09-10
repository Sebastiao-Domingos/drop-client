import EnvioController from "@/controllers/encomenda/envio/Envio";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new EnvioController();

function useActionEnvio() {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.criar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["envios"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: controller.actualizar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["envios"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: controller.apagar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["envios"] });
    },
  });

  return { mutationCreate, mutationDelete , mutationUpdate };
}

export { useActionEnvio };


