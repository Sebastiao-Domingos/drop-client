import MarcaPage from "@/screens/clients/Product/Marca";
import ProductService from "@/services/products";
import { ResolvingMetadata, Metadata } from "next";
import type { Viewport } from "next";

type Props = {
  params: { marca_nome: string; marca_id: string };
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
  try {
    const controller = new ProductService().marca;
    const { response: marcas } = await controller.getAll();
    const img = (marcas.find((marca) => marca.id === params.marca_id) as any)
      ?.imagem;

    const nome = decodeURIComponent(params.marca_nome.replaceAll("-", " "));

    return {
      title: nome,
      applicationName: "Dunorte Solutions",
      description: nome,
      keywords: [nome],
      category: "e-commerce",
      creator: "Dunorte Solutions",
      robots: {
        follow: true,
      },
      openGraph: {
        title: nome,
        description: nome,
        images: img,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      title: "Marca",
      applicationName: "Dunorte Solutions",
      description: "Marcas",
      category: "e-commerce",
      creator: "Dunorte Solutions",
      robots: {
        follow: true,
      },
      openGraph: {
        title: "Marca",
        description: "Marcas",
        images: "/images/mini-logo.svg",
      },
    };
  }
}

export default MarcaPage;
