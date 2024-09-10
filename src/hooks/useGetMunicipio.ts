import MunicipioController from "@/controllers/Municipio";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

const controller = new MunicipioController();

function useGetMunicipio(provincia_id: string) {
  const [provincia, setProvincia] = useState(provincia_id);
  const { data, ...result} = useQuery({
    queryKey: ["municipios", provincia],
    queryFn: () => controller.obter(provincia),
    placeholderData: keepPreviousData,
  });

  //   const body = data;
  
  return { result, data, setProvincia };
}

export { useGetMunicipio };
