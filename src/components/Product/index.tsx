import { numberToMoney } from "@/helpers/functions/numberToMoney";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Produto from "../../../@types/Produto";
import { useActionCart } from "@/hooks/useActionCart";
import ImageWithFallback from "../ImageWithFallback";
import { desconto } from "@/screens/clients/Product/Details/Preco";
import { useRouter } from "next/navigation";
import { dateFormat } from "@/helpers/functions/dateFormat";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  produto: Produto;
}

function Product({ className = "", produto, ...others }: ProductProps) {
  const { mutationAdicionar } = useActionCart();
  const router = useRouter();
  const url = `
        /category/${produto.sub_produto.sub_categoria.categoria
          .id!}/${produto.sub_produto.sub_categoria.categoria.nome.replaceAll(
    " ",
    "-"
  )}/subcategory/${
    produto.sub_produto.sub_categoria.id
  }/${produto.sub_produto.sub_categoria.nome.replaceAll(" ", "")}/subproduct/${
    produto.sub_produto.id
  }/product/${produto.referencia}
        `;
  return (
    <div
      title={produto.nome}
      className={twMerge(
        "w-full bg-white dark:bg-gray-950 rounded-lg overflow-hidden border transition-all hover:border-primary shadow-lg snap-center relative",
        className
      )}
      {...others}
    >
      {produto.itens_promocao.length !== 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b overflow-hidden flex flex-row text-white z-10">
          <div className="p-1 bg-[#e8474c]/50 text-[10px] sm:text-xs">
            {dateFormat(produto.itens_promocao[0].promocao.data_fim)}
          </div>
          <div className="p-1 bg-[#e8474c] font-bold whitespace-nowrap text-[10px] sm:text-xs">
            -
            {numberToMoney(
              (
                Number(produto.preco) -
                Number(
                  desconto(
                    produto.preco,
                    produto.itens_promocao[0].promocao.desconto,
                    produto.itens_promocao[0].promocao.percentagem
                  )
                )
              ).toString()
            )}
          </div>
        </div>
      )}

      <div className="p-2 md:p-4 relative">
        <Link href={url}>
          <div className="relative w-full h-[180px] xs:h-[180px] sm:h-[200px] md:h-[250px] overflow-hidden">
            <ImageWithFallback
              height={250}
              width={350}
              src={produto.imagem}
              alt={produto.nome.toLocaleLowerCase()}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-auto h-auto"
              // loading="eager"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center my-2 gap-x-2">
          <span className="w-5 h-5 text-[10px] p-1 border border-dashed border-primary dark:border-primary/50 rounded-full flex justify-center items-center text-primary">
            N
          </span>
          {produto.itens_promocao.length !== 0 && (
            <span className="w-5 h-5 text-[10px] p-1 border border-dashed border-[#e8474c] dark:border-[#e8474c]/50 rounded-full flex justify-center items-center text-[#e8474c]">
              P
            </span>
          )}
          {/* <span className="inline-block bg-blue-400/50 p-1 text-[10px] text-primary dark:text-slate-200 rounded ml-auto">
            <i className="ri-truck-line mr-1 dark:text-slate-200"></i>
            Entrega grátis
          </span> */}
        </div>
      </div>

      <div className="px-2 md:px-4">
        <div>
          <Link href={url}>
            <h2 className="text-xs h-8 md:h-12 text-primary md:text-base uppercase line-clamp-2">
              {produto.nome}
            </h2>
          </Link>
          {/* <p className="text-[10px] text-gray-400 md:text-xs">
            Lorem ipsum dolor teste
          </p> */}
        </div>

        <div
          title={numberToMoney(produto.preco)}
          className="flex flex-row justify-between md:items-center gap-1 md:gap-2 my-3"
        >
          {/* prices */}
          <div>
            <p
              className={twMerge(
                "text-primary text-sm sm:text-lg md:text-xl whitespace-nowrap h-14 md:h-auto mb-0",
                produto.itens_promocao.length !== 0 &&
                  "text-[#e8474c] font-bold"
              )}
            >
              {numberToMoney(
                produto.itens_promocao.length !== 0
                  ? desconto(
                      produto.preco,
                      produto.itens_promocao[0].promocao.desconto,
                      produto.itens_promocao[0].promocao.percentagem
                    )
                  : produto.preco
              )}
            </p>
            <p
              className={twMerge(
                "text-gray-400 text-[8px] md:text-xs opacity-0 inline-block",
                produto.itens_promocao.length !== 0 &&
                  "before:content-[''] before:absolute before:w-full before:border-t before:top-[8px] before:-rotate-[8deg] opacity-100 relative"
              )}
            >
              {numberToMoney(produto.preco)}
            </p>
          </div>

          {/* shop and stack buttons */}
          <div className="text-primary space-x-2">
            {/* <button>
              <i className="ri-stack-line md:text-2xl"></i>
            </button> */}
            <button
              disabled={mutationAdicionar.isPending}
              onClick={() => {
                produto.roupa
                  ? router.push(url)
                  : mutationAdicionar.mutate(
                      { produto, quantidade: 1 },
                      {
                        onSuccess() {
                          toast("Produto adicionado", {
                            autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                            type: "success",
                          });
                        },
                        onError(err) {
                          toast(err.message || "Erro ao adicionar produto", {
                            autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                            type: "error",
                          });
                        },
                      }
                    );
              }}
            >
              {!mutationAdicionar.isPending && (
                <i className="ri-shopping-bag-line text-sm sm:text-lg md:text-xl"></i>
              )}
              {mutationAdicionar.isPending && (
                <div className=" flex flex-col justify-center items-center">
                  <i className="ri-loader-line text-sm sm:text-lg md:text-xl animate-spin"></i>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* condição do produto */}
        <div className="space-x-2">
          <span className="text-gray-400 text-[9px] md:text-xs">
            <span className="w-2 h-2 inline-block bg-green-600 rounded-full mr-[2px]"></span>
            Online
          </span>
          <span className="text-gray-400 text-[9px] md:text-xs">
            <span className="w-2 h-2 inline-block bg-gray-600 rounded-full mr-[2px]"></span>
            Loja
          </span>
          {/* <span className="text-gray-400 text-[9px] md:text-xs">
            <span className="w-2 h-2 inline-block bg-red-600 rounded-full mr-[2px]"></span>
            Fornecidor
          </span> */}
        </div>
      </div>
      {/* Entrega até 05 de Setembro */}
      <div className="bg-primary text-center text-white text-[10px] md:text-xs py-1">
        {"J.P.P. Dunorte Solutions".toUpperCase()}
      </div>
    </div>
  );
}
export default Product;
