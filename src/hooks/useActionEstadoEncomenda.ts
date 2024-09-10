import EstadoEncomendaController from "@/controllers/encomenda/estado_encomenda/Estado";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const controller = new EstadoEncomendaController();

function useActionEstadoEncomenda() {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.criar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["estados"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: controller.actualizar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["estados"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: controller.apagar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["estados"] });
    },
  });

  return { mutationCreate, mutationDelete , mutationUpdate };
}


function useGetEstadoEncomenda() {

  const controller = new EstadoEncomendaController();
  const { data, ...result } = useQuery({
    queryKey: ["estados"],
    queryFn: controller.obter,
    placeholderData: keepPreviousData,
  });

  return { result, data };
}

export { useActionEstadoEncomenda , useGetEstadoEncomenda };


