import ThemeProvider from "@/contexts/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Dunorte Solutions",
    default: "Loja",
  },
  description:
    "Dunorte Solutions, o seu destino online confiável para uma ampla variedade de produtos essenciais. Oferecemos uma seleção de materiais de construção, produtos para bebé, itens de higiene e muito mais, tudo ao seu alcance com apenas alguns cliques",
  keywords: [
    "dunorte solutions",
    "venda online",
    "ecommerce",
    "compra online",
    "loja online angola",
    "dropshipping angola",
    "ofertas e promoções angola",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-pt" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID!} />
        <ToastContainer
          stacked
          position="bottom-right"
          // progressClassName={"bg-primary"}
          toastClassName={"dark:!bg-gray-900 dark:text-white"}
          draggableDirection="x"
          draggable="mouse"
          autoClose={3000}
        />
      </body>
      {/*  className="flex flex-row-reverse min-h-screen" */}
    </html>
  );
}
