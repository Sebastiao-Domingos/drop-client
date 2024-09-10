import ProvinciaController from "@/controllers/Provincias";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

const controller = new ProvinciaController();

function useGetProvincias() {
  const { data, ...result } = useQuery({
    queryKey: ["provincias"],
    queryFn: () => controller.obter(),
    placeholderData: keepPreviousData,
  });
  var body = data;
  return { result, body };
}

function useGetProvinciasByPaisId() {
  const [pais_id, setPais_id] = useState("");
  const { data, ...result } = useQuery({
    queryKey: ["provincias", pais_id],
    queryFn: () => controller.obter(pais_id),
    placeholderData: keepPreviousData,
  });
  var body = data;
  return { result, body, setPais_id };
}
export { useGetProvincias, useGetProvinciasByPaisId };
