'use client';

import SessionController from '@/controllers/Session';
import { numberToMoney } from '@/helpers/functions/numberToMoney';
import { useActionCart } from '@/hooks/useActionCart';
import { useGetCarrinho } from '@/hooks/useGetCarrinho';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { desconto } from './Details/Preco';
import Produto from '../../../../@types/Produto';
import { toast } from 'react-toastify';
import { DEFAULT_TOAST_TIME_VISIBILITY } from '@/helpers/constants';

export function subtotalPorProduto(data: {
  produto: Produto;
  quantidade: number;
  id: string;
}) {
  return (
    (data.produto.itens_promocao.length !== 0
      ? Number(
          desconto(
            data.produto.preco,
            data.produto.itens_promocao[0]?.promocao.desconto || '0',
            data.produto.itens_promocao[0]?.promocao.percentagem
          )
        )
      : Number(data.produto.preco)) * data.quantidade
  );
}

function CartScreen() {
  const queryCarrinho = useGetCarrinho();
  const router = useRouter();
  const pathname = usePathname();
  const { mutationRemover } = useActionCart();

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-950 px-4 py-6 text-center font-light mb-2">
        <h1 className="text-lg md:text-3xl">Carrinho de compras</h1>
      </div>
      {queryCarrinho.isSuccess && queryCarrinho.data.carrinho.length !== 0 && (
        <>
          <div className="bg-red-100 dark:bg-gray-950 py-3 text-center font-light mb-8">
            <p className="flex items-center justify-center text-sm md:text-base">
              <i className="ri-error-warning-line mr-1"></i>
              ATENÇÃO: As quantidades podem sofrer alterações de acordo com o
              stock disponível
            </p>
          </div>

          {/* lista dos produtos no carrinho */}
          <div className="overflow-x-auto px-2 md:px-0 scroll-mb-2">
            <table className="min-w-[498px] w-full text-sm">
              <thead>
                <tr className="border-b dark:border-b-gray-800 dark:border-b">
                  <th className="text-left pb-4">Produto</th>
                  <th className="text-left pb-4">Detalhe</th>
                  <th className="pb-4">Preço unit.(c/IVA)</th>
                  <th className="pb-4">Desconto</th>
                  <th className="pb-4">Qtd.</th>
                  <th className="pb-4">Sub-total(c/IVA)</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody>
                {queryCarrinho.isSuccess &&
                  queryCarrinho.data.carrinho.filter(
                    (data) => data.produto.online
                  ) &&
                  queryCarrinho.data.carrinho.map((data) => (
                    <tr
                      key={data.id}
                      className="text-center border-b dark:border-b-gray-800 last:border-0"
                    >
                      <td className="text-left py-4">
                        <Link
                          className="flex items-center gap-1"
                          href={`/product/${data.produto.referencia}`}
                        >
                          <Image
                            width={64}
                            height={64}
                            src={data.produto.imagem}
                            alt={data.produto.nome}
                            loading="lazy"
                            className="mr-2"
                          />
                          {data.produto.nome}
                        </Link>
                      </td>
                      <td>
                        {data.produto.roupa && (
                          <div className="flex flex-row gap-2">
                            <span>{data.tamanho}</span>
                            <span
                              style={{
                                backgroundColor: data.cor,
                              }}
                              className="w-4 h-4 rounded-full inline-block"
                            ></span>
                          </div>
                        )}
                      </td>
                      <td className="py-4">
                        {numberToMoney(
                          data.produto.itens_promocao?.length !== 0
                            ? desconto(
                                data.produto.preco,
                                data.produto.itens_promocao[0].promocao
                                  .desconto,
                                data.produto.itens_promocao[0].promocao
                                  .percentagem
                              )
                            : data.produto.preco
                        )}
                      </td>
                      <td className="py-4">
                        {data.produto.itens_promocao?.length !== 0
                          ? numberToMoney(
                              (
                                Number(data.produto.preco) -
                                Number(
                                  desconto(
                                    data.produto.preco,
                                    data.produto.itens_promocao[0].promocao
                                      .desconto,
                                    data.produto.itens_promocao[0].promocao
                                      .percentagem
                                  )
                                )
                              ).toFixed(2)
                            )
                          : 0}
                      </td>
                      <td className="py-4">
                        {!data.produto.online && (
                          <Tooltip
                            title="Este produto já não está disponível... Por favor remova antes de continuar"
                            arrow
                          >
                            <i className="ri-alert-fill text-xl bg-red-600/30 text-red-600 shadow-lg shadow-red-600"></i>
                          </Tooltip>
                        )}
                        {data.produto.online && (
                          <InputChangeQuantidade
                            defaultQuantidade={data.quantidade}
                            produto_id={data.id}
                            onSuccess={(value) => {
                              toast(
                                `Quantidade de ${data.produto.nome} alterada para ${value} unidade(s)`,
                                {
                                  type: 'success',
                                  autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                                }
                              );
                            }}
                          />
                        )}
                      </td>
                      <td className="py-4">
                        {numberToMoney(
                          subtotalPorProduto(data)
                            // Number(data.produto.preco) * data.quantidade
                            .toString()
                        )}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => {
                            mutationRemover.mutate(data.id);
                          }}
                          className="px-3"
                        >
                          <i className="ri-delete-bin-2-line text-red-600 text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <form
            action="#"
            method="post"
            className="my-8 px-4 border-b dark:border-b-gray-800 pb-4"
          >
            <p className="text-sm font-light mb-2">Código promocional</p>
            <div className="flex flex-row">
              <input
                type="text"
                name="code"
                id="code"
                placeholder="Digite seu código promocional"
                required
                className="p-2 outline-none bg-primary/30 rounded-l placeholder:text-white"
              />
              <button
                type="submit"
                className="py-2 px-4 md:w-auto flex items-center justify-center text-white bg-slate-800 rounded-r"
              >
                Aplicar
              </button>
            </div>
          </form>

          <div className="space-y-4 my-8 text-sm">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b dark:border-b-gray-800">
                  <th className="pb-4">Total (s/IVA)</th>
                  <th className="pb-4">IVA</th>
                  <th className="pb-4">Total (c/IVA)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4">
                    {numberToMoney(queryCarrinho.data?.valor_total || '0')}
                  </td>
                  <td className="py-4">14.25 kz</td>
                  <td className="py-4">
                    {numberToMoney(queryCarrinho.data?.valor_total || '0')}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between items-center px-4 md:px-0">
              <Link
                href="/"
                className="px-4 py-2 text-white rounded bg-slate-800"
              >
                Continuar a comprar
              </Link>
              <div>
                <Link
                  href={'/user/checkout'}
                  className="px-4 py-2 text-white flex items-center gap-1 rounded bg-primary"
                  onClick={async (evt) => {
                    evt.preventDefault();
                    try {
                      const session = new SessionController();
                      const data = await session.getUserData();

                      for (
                        let i = 0;
                        i < queryCarrinho.data.carrinho.length;
                        i++
                      ) {
                        const {
                          produto: { online, nome },
                        } = queryCarrinho.data.carrinho[i];

                        if (!online) {
                          toast(
                            `O produto ${nome} já não está disponível, por favor remova do carrinho antes de continuar`,
                            { type: 'warning' }
                          );
                          return;
                        }
                      }

                      if (!data || data.tipo_usuario !== 'cliente') {
                        router.push('/login?url=' + pathname);
                        return;
                      }
                      router.push('/user/checkout');
                    } catch (error) {
                      router.push('/login?url=' + pathname);
                    }
                  }}
                >
                  Comprar
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {queryCarrinho.isError && (
        <div className="px-2 py-3 text-center text-red-600 font-light mb-8">
          <p className="flex items-center justify-center text-sm md:text-base">
            <i className="ri-error-warning-line mr-1"></i>
            {queryCarrinho.error?.message ||
              'UPS!! Ocorreu um erro ao carregar o carrinho!'}
          </p>
        </div>
      )}

      {queryCarrinho.isSuccess && queryCarrinho.data.carrinho.length === 0 && (
        <div className="px-2 py-3 text-center font-light mb-8">
          <p className="flex items-center justify-center text-sm md:text-base">
            <i className="ri-error-warning-line mr-1"></i>
            {'Carrinho vazio!'}
          </p>
        </div>
      )}
    </>
  );
}

interface InputChangeQuantidadeProps {
  defaultQuantidade: number;
  produto_id: string;
  onSuccess?: (value: number) => void;
}

function InputChangeQuantidade({
  defaultQuantidade,
  produto_id,
  onSuccess,
}: InputChangeQuantidadeProps) {
  const { mutationQuantidade } = useActionCart();
  const [qtd, setQtd] = useState(defaultQuantidade);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (qtd === defaultQuantidade) return;

    timeoutRef.current = setTimeout(() => {
      mutationQuantidade.mutate(
        {
          id: produto_id,
          quantidade: qtd,
        },
        {
          onSuccess: () => {
            onSuccess && onSuccess(qtd);
          },
          onError(error) {
            toast(error.message, { type: 'error' });
          },
          onSettled(data) {
            console.log(data);
          },
        }
      );
    }, 1500);
  }, [mutationQuantidade, onSuccess, qtd, produto_id, defaultQuantidade]);

  return (
    <div className="inline-block">
      <div className="bg-white dark:bg-gray-950 flex items-center border rounded">
        <button onClick={() => qtd > 1 && setQtd((v) => v - 1)} className="p-2">
          <i className="ri-subtract-fill"></i>
        </button>
        <input
          type="text"
          min={1}
          value={qtd}
          className="w-12 p-2 bg-transparent text-center outline-none border-l border-r"
          name="qtd"
          onChange={(evt) => {
            if (isNaN(Number(evt.target.value))) {
              setQtd(qtd);
              return;
            }
            setQtd(qtd || 1);
          }}
        />
        <button className="p-2" onClick={() => setQtd((v) => v + 1)}>
          <i className="ri-add-line"></i>
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
