import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar na conta",
  description: "Entrar na conta",
};

function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default layout;
