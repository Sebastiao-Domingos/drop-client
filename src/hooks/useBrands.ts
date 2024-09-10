import { useEffect, useState } from "react";
// import { MarcaModel } from "../services/products/Marca";

function useBrands() {
  const [brands, setBrands] = useState<
    {
      id: string;
      nome: string;
      imagem: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/produto/marca")
      .then((res) => res.json())
      .then((data) => setBrands(data.response));
  }, []);

  return { brands };
}

export { useBrands };
