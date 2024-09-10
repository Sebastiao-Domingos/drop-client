import { EspecificacaoModel } from "@/services/products/Especificacao";
import { SubProdutoModel } from "@/services/products/SubProduto";
import { PromocaoData } from "@/services/promocao";

export type Produto = {
  created_at: Date;
  updated_at: Date;
  id: string;
  imagem: string;
  // marca: MarcaData;
  descricao: string;
  marca_id: string;
  nome: string;
  preco: string;
  referencia: string;
  online: boolean;
  sub_produto: SubProdutoModel;
  roupa: boolean;
  marca: {
    id: string;
    nome: string;
    imagem: string;
  };
  imagens_adicionais: {
    id: string;
    url: string;
  }[];
  caracteristica: Caracterisitca[];
  especificacao?: Omit<EspecificacaoModel, "produto_id">[];
  itens_promocao: { id: string; promocao: PromocaoData }[];
};

export type Caracterisitca = {
  id: string;
  valor: string;
  atributo: {
    id: string;
    nome: string;
  };
};

export default Produto;
