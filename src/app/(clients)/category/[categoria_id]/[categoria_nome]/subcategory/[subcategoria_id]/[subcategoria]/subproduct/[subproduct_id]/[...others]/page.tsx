import ProdutsBySubproducts from "@/screens/clients/Product/ProductsBySubproducts";
import ProductService from "@/services/products";
import { ResolvingMetadata, Metadata } from "next";
import type { Viewport } from "next";

type Props = {
  params: { others: string[]; subproduct_id: string };
  //   searchParams: { [key: string]: string | string[] | undefined };
};

export const viewport: Viewport = {
  // colorScheme: "dark",
  initialScale: 1,
  width: "device-width",
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // fetch data
  const controller = new ProductService().categoria.subCategoria.subProduto;
  const { response: subprodutos } = await controller.getAll();

  const img = (
    subprodutos.find(
      (subproduto) => subproduto.id === params.subproduct_id
    ) as any
  )?.imagem;
  const nome = decodeURIComponent(params.others[0].replaceAll("-", " "));

  return {
    title: nome,
    // description: product?.descricao || "Produto não encontrado!",
    applicationName: "Dunorte Solutions",
    description: nome,
    category: "e-commerce",
    creator: "Dunorte Solutions",
    robots: {
      follow: true,
    },
    openGraph: {
      title: nome,
      description: nome,
      images: [{ url: img }],
    },
  };
}

export default ProdutsBySubproducts;
