import ModoPagamentoController from "@/controllers/encomenda/modo_pagamneto/Modo";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const controller = new ModoPagamentoController();

function useActionModoPagamento() {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.criar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["modo"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: controller.actualizar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["modo"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: controller.apagar,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["modo"] });
    },
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
}

function useGetModoPagamento(){
    const { data , ...result} = useQuery({
        queryKey : ["modo"],
        queryFn : controller.obter,
        placeholderData : keepPreviousData
    })

    return { data , result};
}

export { useActionModoPagamento , useGetModoPagamento };


