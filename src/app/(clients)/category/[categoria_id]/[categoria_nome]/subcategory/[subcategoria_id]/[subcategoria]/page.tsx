import SubcategoriasScreen from "@/screens/clients/Subcategoria";
import ProductService from "@/services/products";
import { ResolvingMetadata, Metadata } from "next";
import type { Viewport } from "next";

type Props = {
  params: { subcategoria: string; subcategoria_id: string };
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
  const controller = new ProductService().categoria.subCategoria;
  const { response: subcategorias } = await controller.getAll();

  const img = subcategorias.find(
    (subcategoria) => subcategoria.id === params.subcategoria_id
  )?.imagem;

  const nome = decodeURIComponent(params.subcategoria.replaceAll("-", " "));

  return {
    title: nome,
    // description: product?.descricao || "Produto não encontrado!",
    applicationName: "Dunorte Solutions",
    description: nome,
    category: "e-commerce",
    creator: "Dunorte Solutions",
    keywords: [nome],
    robots: {
      follow: true,
    },
    openGraph: {
      title: nome,
      description: nome,
      images: [{ url: img! }],
    },
  };
}

export default SubcategoriasScreen;
