import { Button } from "@/components/Buttons/Button";
import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { useActionSugestaoItemProdutoEncomendaClient } from "@/hooks/encomenda/cliente/sugestaoItemProdutoEncomenda/useActionValidateSugestaoItemProdutoEncomenda";
import { ItemSugestao } from "@/services/encomenda/cliente/sugestao_item_produto_encomenda";
import { useState } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";
import { SugestaoEstado } from "@/controllers/encomenda/cliente/SugestaoItemEncomendaProdutoController";
import Table, { TBody, THead } from "@/components/Table";

type ItemBodyProps = {
  sugestao_id: string;
  itemSugerido: ItemSugestao;
  quantidade: number;
  estado: SugestaoEstado;
};

export function ItemBody({
  itemSugerido,
  sugestao_id,
  quantidade,
  estado,
}: ItemBodyProps) {
  const [actionType, setActionType] = useState<"aprova" | "nega">("aprova");
  const { mutationValidate } = useActionSugestaoItemProdutoEncomendaClient();

  if (itemSugerido.produto.roupa) {
    return (
      <li className="px-4">
        <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 pb-4">
          <div className="relative mx-auto md:mx-0 w-[50px] h-[50px] bg-slate-600 rounded-full overflow-hidden">
            <ImageWithFallback
              src={itemSugerido.produto.imagem}
              alt={itemSugerido.produto.nome}
              width={50}
              height={50}
              className="w-full h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              priority
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
              Produto:{" "}
              <span className="font-bold">{itemSugerido.produto.nome}</span>
            </p>
            <div className="space-x-2 flex">
              <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
                Preço:{" "}
                <span className="font-bold">
                  {numberToMoney(itemSugerido.produto.preco)}
                </span>
              </p>
              <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
                Quantidade:{" "}
                <span className="font-bold">
                  {quantidade.toString().padStart(2, "0")}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Table className="w-full border-spacing-0 mt-2">
          <THead className="bg-blue-200/30 h-auto">
            <th className="font-bold py-2 pl-2">Tamanho</th>
            <th className="font-bold py-2">Cor</th>
            <th className="font-bold py-2 text-right">Acção</th>
          </THead>
          <TBody>
            {itemSugerido.especificacao.map((especificacao) => (
              <tr
                key={especificacao.id}
                className="border-t dark:border-t-gray-800 hover:bg-primary/5"
              >
                <td className="py-1 uppercase">{especificacao.tamanho}</td>
                <td className="py-1">
                  <span
                    style={{ backgroundColor: especificacao.cor }}
                    className="inline-block w-6 h-6 rounded-full transition border"
                  ></span>
                </td>
                <td className="py-1 text-right">
                  {estado === "pendente" && (
                    <Button
                      disabled={mutationValidate.isPending}
                      label="Aceitar"
                      className="w-full md:w-auto text-sm px-2 py-1 bg-gray-950 mb-4 md:mb-0 ml-auto"
                      onClick={() => {
                        setActionType("aprova");
                        mutationValidate.mutate(
                          {
                            acao: "aprova",
                            sugestao_id: sugestao_id,
                            data: {
                              produto_id: itemSugerido.produto_id,
                              tamanho: especificacao.tamanho,
                              cor: especificacao.cor,
                            },
                          },
                          {
                            onSuccess() {
                              actionType === "aprova" &&
                                toast("Produto aprovado com sucesso.", {
                                  type: "success",
                                  autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                                });
                            },
                            onError(error) {
                              toast(error.message, { type: "error" });
                            },
                          }
                        );
                      }}
                      // isLoading={
                      //   mutationValidate.isPending && actionType === "aprova"
                      // }
                    />
                  )}
                </td>
              </tr>
            ))}
          </TBody>
        </Table>
      </li>
    );
  }

  return (
    <li className="flex flex-col md:flex-row justify-between items-center px-4">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 pb-4">
        <div className="relative mx-auto md:mx-0 w-[50px] h-[50px] bg-slate-600 rounded-full overflow-hidden">
          <ImageWithFallback
            src={itemSugerido.produto.imagem}
            alt={itemSugerido.produto.nome}
            width={50}
            height={50}
            className="w-full h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            priority
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
            Produto:{" "}
            <span className="font-bold">{itemSugerido.produto.nome}</span>
          </p>
          <div className="space-x-2 flex">
            <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
              Preço:{" "}
              <span className="font-bold">
                {numberToMoney(itemSugerido.produto.preco)}
              </span>
            </p>
            <p className="p-1 md:ml-4 rounded text-xs md:text-sm text-primary">
              Quantidade:{" "}
              <span className="font-bold">
                {quantidade.toString().padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>
      </div>
      {!itemSugerido.produto.roupa && estado === "pendente" && (
        <Button
          label="Aceitar"
          className="w-full md:w-auto text-sm px-2 py-1 bg-gray-950 mb-4 md:mb-0"
          disabled={mutationValidate.isPending}
          onClick={() => {
            setActionType("aprova");
            mutationValidate.mutate(
              {
                acao: "aprova",
                sugestao_id: sugestao_id,
                data: {
                  produto_id: itemSugerido.produto_id,
                },
              },
              {
                onSuccess() {
                  actionType === "aprova" &&
                    toast("Produto aprovado com sucesso.", {
                      type: "success",
                      autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                    });
                },
                onError(error) {
                  toast(error.message, { type: "error" });
                },
              }
            );
          }}
          isLoading={mutationValidate.isPending && actionType === "aprova"}
        />
      )}
    </li>
  );
}
