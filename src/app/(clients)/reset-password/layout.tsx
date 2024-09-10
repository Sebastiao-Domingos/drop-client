import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar conta",
  description: "Recuperar conta",
};

function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default layout;
