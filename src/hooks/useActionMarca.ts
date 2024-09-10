import MarcaController from "@/controllers/Marca";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new MarcaController();

function useActionMarca() {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.criar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["marca"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: controller.actualizar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["marca"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: controller.apagar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["marca"] });
    },
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
}

export { useActionMarca };
