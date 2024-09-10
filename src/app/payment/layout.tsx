import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Efectuar pagamento",
  description: "Concluir com o pagamento da encomenda",
};

function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default layout;
