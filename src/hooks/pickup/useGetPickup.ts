import PontoPickupController from '@/controllers/pickup';
import { PontoPickupFiltro } from '@/services/pontoPickup';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function useGetPontoPickup(inicialfilter?: Partial<PontoPickupFiltro>) {
  const controller = new PontoPickupController();
  const [filter, setFilter] = useState(inicialfilter);
  const { data, ...result } = useQuery({
    queryKey: ['ponto-pickup'],
    queryFn: () => controller.obter(undefined, filter),
    placeholderData: keepPreviousData,
  });

  function filtro(newFilter: Partial<PontoPickupFiltro>) {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  }

  return { result, data, filtro };
}

function useGetPontoPickUpById(pickup_id: string) {
  const controller = new PontoPickupController();

  const { data, ...result } = useQuery({
    queryKey: ['ponto-pickup'],
    queryFn: () => controller.obter(pickup_id),
    placeholderData: keepPreviousData,
  });

  return { result, data };
}

export { useGetPontoPickUpById, useGetPontoPickup };
