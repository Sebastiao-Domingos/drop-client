import CartController from "@/controllers/Cart";
import { useQuery } from "@tanstack/react-query";

function useGetCarrinho() {
  const controller = new CartController();
  const queryCarrinho = useQuery({
    queryFn: controller.getCarrinho,
    queryKey: ["carrinho"],
  });

  return queryCarrinho;
}

export { useGetCarrinho };
