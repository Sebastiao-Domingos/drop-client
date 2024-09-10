import { ProdutoData } from "@/controllers/Produto";
import { api } from "@/infra/api";
import Produto from "../../../@types/Produto";

export type TabaratoDataResponse = {
    produtos: Produto[],
    total: number,
    totalNaoVisto: number,
    prevPage: number | null,
    nextPage: number | null,
    currentPage: number,
    peerPage: number,
    lastPage: number
}

export type SearchTabaratoParms = {
  peerPage : number,
  currentPage : number
};


class TabaratoService {
  private readonly BASE_PATH = "/produto/barato";


  public async get(params : string) {
    const response = await api
      .get<
        {},
        {
          data: TabaratoDataResponse;
        }
      >(`${this.BASE_PATH}?${params}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default TabaratoService;


