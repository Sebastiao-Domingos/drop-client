import { logger } from "@/Logger";
import NotificacaoController from "@/controllers/notificacoes/Notificacao";
import {
  NotificationDataResponse,
  SearchNotificationParms,
} from "@/services/notificacoes";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

const controller = new NotificacaoController();

function useGetNotificacoesPeloAdministrador(
  filter: Partial<SearchNotificationParms>
) {
  const [query, setQuery] = useState<Partial<SearchNotificationParms>>(filter);

  const { data, ...result } = useQuery<NotificationDataResponse>({
    queryKey: ["notificacoes", query],
    queryFn: () => controller.obterPeloAdministrador(query),
    placeholderData: keepPreviousData,
  });

  function filtro(query: Partial<SearchNotificationParms>) {
    if (query.currentPage) {
      setQuery({ currentPage: query.currentPage });
    }
    if (query.peerPage) {
      setQuery({ peerPage: query.peerPage });
    } else {
      setQuery((prev) => ({ ...prev, ...query }));
    }
  }

  return { filtro, query, result, data };
}

function useGetNotificacoesPeloFornecedor(
  filter: Partial<SearchNotificationParms>
) {
  const [query, setQuery] = useState<Partial<SearchNotificationParms>>(filter);

  const { data, ...result } = useQuery<NotificationDataResponse>({
    queryKey: ["notificacoes", query],
    queryFn: () => controller.obterPeloFornecedor(query),
    placeholderData: keepPreviousData,
  });

  function filtro(query: Partial<SearchNotificationParms>) {
    if (query.currentPage) {
      setQuery({ currentPage: query.currentPage });
    } else {
      setQuery((prev) => ({ ...prev, ...query }));
    }
  }

  return { filtro, query, result, data };
}

export {
  useGetNotificacoesPeloAdministrador,
  useGetNotificacoesPeloFornecedor,
};
