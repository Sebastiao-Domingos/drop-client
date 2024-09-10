import { api } from "@/infra/api";

export type ImagemResponse = {
  id: string;
  url: string;
  produto_id: string;
  created_at: Date;
  updated_at: boolean;
};

class Imagem {
  private readonly BASE_PATH = "/produto/imagem";

  /**
   * addImagemProduto
   */
  public async addImagemProduto(produto_id: string, imagens: FormData) {
    const response = await api
      .post<{}, { data: ImagemResponse[] }>(
        `${this.BASE_PATH}/${produto_id}`,

        imagens,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => response.data);

    return { status: 201, response };
  }

  /**
   * removeImagemProduto
   */
  public async delete(imagem_id: string) {
    const response = await api
      .delete<{}, { data: { status: number; message: string } }>(
        `${this.BASE_PATH}/${imagem_id}`
      )
      .then((response) => response.data);

    return {
      status: 200,
      response,
    };
  }
}

export default Imagem;
