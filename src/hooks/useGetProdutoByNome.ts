import ProdutoController from "@/controllers/Produto";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const controller = new ProdutoController();

function useGetProdutoByNome<T>(
  filter?: Partial<{
    nome: string;
    peerPage: string;
  }>
) {
  const [nome, setNome] = useState("");
  const { data, ...result } = useQuery<any>({
    queryKey: ["produtos", nome],
    queryFn: ({ signal }) =>
      controller.obter(
        {
          nome: nome,
          currentPage: 1,
          peerPage: Number(filter?.peerPage || 5),
          online: 1,
        },
        signal
      ),
    // placeholderData: keepPreviousData,
  });
  const body: T = data;
  return { setNome, nome, result, body };
}

export { useGetProdutoByNome };
