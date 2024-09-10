import NotificacaoController from "@/controllers/notificacoes/Notificacao";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const controller = new NotificacaoController();

function useActionNotificacao(){
    const queryClient = useQueryClient();

    const mutationCreate = useMutation({
        mutationFn : controller.criar,
        onSuccess(){
            queryClient.invalidateQueries({queryKey : ["notificacoes"]})
        }
    })

    const mutationUpdate = useMutation({
        mutationFn : controller.actualizar,
        onSuccess(){
            queryClient.invalidateQueries({queryKey : ["notificacoes"]})
        }
    })

    const mutationCheckAllAdmin = useMutation({
        mutationFn : controller.marcaTodasLidasAdmin,
        onSuccess(){
            queryClient.invalidateQueries({queryKey : ["notificacoes"]})
        }
    })

    const mutationCheckAllFornecedor = useMutation({
        mutationFn : controller.marcaTodasLidasFornecedor,
        onSuccess(){
            queryClient.invalidateQueries({queryKey : ["notificacoes"]})
        }
    })

    const mutationDelete = useMutation({
        mutationFn : controller.apagar,
        onSuccess(){
            queryClient.invalidateQueries({queryKey : ["notificacoes"]})
        }
    })

   return {mutationCreate , mutationUpdate , mutationDelete , mutationCheckAllAdmin, mutationCheckAllFornecedor}
}


export {useActionNotificacao };