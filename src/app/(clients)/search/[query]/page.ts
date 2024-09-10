import SearchScreen from "@/screens/clients/Search";
import { ResolvingMetadata, Metadata } from "next";
import type { Viewport } from "next";

type Props = {
  params: { query: string };
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

  return {
    title: `Pesquisa "${params.query}"`,
    description: "Pesquisar produto",
    applicationName: "Dunorte Solutions",
    category: "e-commerce",
    creator: "Dunorte Solutions",
    robots: {
      follow: false,
    },
    openGraph: {
      title: `Pesquisa "${params.query}"`,
      description: "Pesquisar produto",
    },
  };
}

export default SearchScreen;
