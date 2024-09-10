import { useCountdown } from "@/hooks/useCountdown";
import Produto from "../../../../../@types/Produto";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { twMerge } from "tailwind-merge";

interface PrecoProps {
  produto: Produto;
}

export function desconto(
  preco: string,
  valorDesconto: string,
  percentual: boolean
) {
  return percentual
    ? descontoPorPecentagem(preco, valorDesconto)
    : descontoPorValor(preco, valorDesconto);
}

function descontoPorPecentagem(preco: string, percentagem: string) {
  return (Number(preco) - Number(preco) * (Number(percentagem) / 100)).toFixed(
    2
  );
}

function descontoPorValor(preco: string, valor: string) {
  return (Number(preco) - Number(valor)).toFixed(2);
}

function Preco({ produto }: PrecoProps) {
  const { countdown } = useCountdown(
    new Date(produto.itens_promocao[0]?.promocao.data_fim || 0).getTime()
  );

  if (countdown.isOver) {
    return (
      <>
        <span className="font-bold text-primary">
          <span className="text-3xl lg:text-4xl">
            {numberToMoney(produto.preco).split(",")[0]}
          </span>
          <span className="text-base lg:text-3xl">
            ,{numberToMoney(produto.preco).split(",")[1]}
          </span>
        </span>
      </>
    );
  }

  return (
    <>
      <span className={twMerge("font-bold text-[#e8474c]")}>
        <span className="text-3xl lg:text-4xl">
          {
            numberToMoney(
              desconto(
                produto.preco,
                produto.itens_promocao[0]?.promocao.desconto || "0",
                produto.itens_promocao[0]?.promocao.percentagem
              )
            ).split(",")[0]
          }
        </span>
        <span className="text-base lg:text-3xl">
          ,
          {
            numberToMoney(
              desconto(
                produto.preco,
                produto.itens_promocao[0]?.promocao.desconto || "0",
                produto.itens_promocao[0]?.promocao.percentagem
              )
            ).split(",")[1]
          }
        </span>
      </span>
      <span className="font-bold block sm:inline sm:ml-2 line-through opacity-40">
        {numberToMoney(produto.preco || "0")}
      </span>
    </>
  );
}

export default Preco;
