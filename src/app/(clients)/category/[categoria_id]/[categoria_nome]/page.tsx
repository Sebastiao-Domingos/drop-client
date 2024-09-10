import CategoriaScreen from "@/screens/clients/Categoria";
import { ResolvingMetadata, Metadata } from "next";
import type { Viewport } from "next";

type Props = {
  params: { categoria_nome: string; categoria_id: string };
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
  const nome = decodeURIComponent(params.categoria_nome.replaceAll("-", " "));

  return {
    title: nome,
    description: nome,
    applicationName: "Dunorte Solutions",
    category: "e-commerce",
    creator: "Dunorte Solutions",
    keywords: [nome],
    robots: {
      follow: true,
    },
    openGraph: {
      title: nome,
      description: nome,
    },
  };
}
export default CategoriaScreen;
