import DetailsScreen from "@/screens/clients/Product/Details";
import type { Metadata, ResolvingMetadata } from "next";
import ProductService from "@/services/products";
import type { Viewport } from "next";

type Props = {
  params: { product_name: string };
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
  const id = params.product_name;
  const controller = new ProductService();

  // fetch data
  const { response: product } = await controller.getByReferencia(id);
  return {
    title: product?.nome || "404",
    description: product?.descricao || "Produto não encontrado!",
    applicationName: "Dunorte Solutions",
    category: "e-commerce",
    creator: "Dunorte Solutions",
    keywords: [product.nome],
    robots: {
      follow: true,
    },
    openGraph: {
      title: product?.nome || "404",
      description: product?.descricao || "Produto não encontrado!",
      images: [{ url: product?.imagem }],
    },
  };
}

export default DetailsScreen;
