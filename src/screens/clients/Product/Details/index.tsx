'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import { useEffect, useRef, useState } from 'react';
import { useGetProduto } from '@/hooks/useGetProduto';
import Produto from '../../../../../@types/Produto';
import { useActionCart } from '@/hooks/useActionCart';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import ProductContainerRow from '@/components/Product/ProductContainerRow';
import Product from '@/components/Product';
import { GetProdutoResponse } from '@/controllers/Produto';
import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductScreenDetailsLoader from '@/components/Skeleton/Loaders/Product/ProductScreenDetailsLoader';
import ContadorPromocao from './ContadorPromocao';
import Preco from './Preco';
import { dateFormat } from '@/helpers/functions/dateFormat';
import Select from '@/components/Select';
import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { notFound } from 'next/navigation';
import { toast } from 'react-toastify';
import { DEFAULT_TOAST_TIME_VISIBILITY } from '@/helpers/constants';

interface DetailsScreenProps {
  params: {
    product_name: string;
  };
}
const settings: Settings = {
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

function DetailsScreen({ params: { product_name } }: DetailsScreenProps) {
  const { mutationAdicionar } = useActionCart();
  const [qtd, setQtd] = useState(1);
  const { result, body } = useGetProduto<Produto>({
    referencia: product_name,
    currentPage: undefined,
  });
  const [tamanho, setTamanho] = useState('');
  const sliderRef = useRef<Slider>(null);
  const [selectedColor, setSelectedColor] = useState({ cor: '', id: '' });

  const {
    filtro,
    query,
    body: bodyRelated,
  } = useGetProduto<GetProdutoResponse>({
    currentPage: 1,
    peerPage: 6,
    online: 1,
  });

  useEffect(() => {
    if (!body || query.sub_produto_id === body.sub_produto.id) return;
    filtro({ sub_produto_id: body.sub_produto.id });
  }, [body, query, filtro]);

  useEffect(() => {
    if (body && body.roupa && isEmptyString(tamanho))
      setTamanho(body.especificacao![0]?.tamanho);
  }, [body, tamanho]);

  if (result.isPending) {
    return <ProductScreenDetailsLoader />;
  }

  if (result.isSuccess && (!body || !body.online)) {
    notFound();
    // return "Produto não encontrado";
  }

  if (result.isError) {
    return JSON.stringify(result.error || {});
  }

  return (
    <div className="mx-auto mb-8 max-w-[1300px]">
      <Breadcrumb className="bg-transparent">
        <BreadcrumbItem name="Página inicial" href="/" />

        {result.isSuccess && body !== undefined && (
          <BreadcrumbItem
            name={body.sub_produto.sub_categoria.categoria.nome}
            href={`/category/${
              body.sub_produto.sub_categoria.categoria.id
            }/${body.sub_produto.sub_categoria.categoria.nome.replaceAll(
              ' ',
              '-'
            )}?categoria=${encodeURIComponent(
              body.sub_produto.sub_categoria.categoria.nome
            )}`}
          />
        )}

        {result.isSuccess && body && body !== undefined && (
          <BreadcrumbItem
            name={body.sub_produto.sub_categoria.nome}
            href={`/category/${body.sub_produto.sub_categoria.categoria
              .id!}/${body.sub_produto.sub_categoria.categoria.nome.replaceAll(
              ' ',
              '-'
            )}/subcategory/${
              body.sub_produto.sub_categoria.id
            }/${body.sub_produto.sub_categoria.nome.replaceAll(
              ' ',
              '-'
            )}?subcategoria=${encodeURIComponent(
              body.sub_produto.sub_categoria.nome
            )}
          `}
          />
        )}

        {result.isSuccess && body && body !== undefined && (
          <BreadcrumbItem
            name={body.sub_produto.nome}
            href={`/category/${body.sub_produto.sub_categoria.categoria
              .id!}/${body.sub_produto.sub_categoria.categoria.nome.replaceAll(
              ' ',
              '-'
            )}/subcategory/${
              body.sub_produto.sub_categoria.id
            }/${body.sub_produto.sub_categoria.nome.replaceAll(
              ' ',
              '-'
            )}/subproduct/${body.sub_produto.id}/${encodeURIComponent(
              body.sub_produto.nome.replaceAll(' ', '-')
            )}
            `}
          />
        )}

        {result.isSuccess && body && body !== undefined && (
          <BreadcrumbItem name={body.nome} href={'#'} />
        )}
      </Breadcrumb>

      <div className="pt-0 sm:py-8 px-3 md:px-0 z-50">
        <h1 className="text-lg sm:text-xl uppercase font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
          {body.nome}
        </h1>
        <p className="text-xs uppercase mt-2">Ref.: {body.referencia}</p>
        <p className="text-xs uppercase mt-2 opacity-60">
          Garantia: <span className="font-bold">Saiba mais!</span>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-950 p-3 lg:p-6 mt-3 rounded-lg shadow-lg lg:flex lg:flex-row lg:items-start gap-4">
        {/* imagens */}
        <div className="mb-8 lg:mb-0 lg:sticky lg:top-0 flex flex-col-reverse lg:flex-row items-start gap-4">
          <div className="w-full overflow-auto lg:w-20 flex flex-row items-center lg:items-stretch lg:flex-col gap-2">
            <ImageWithFallback
              src={body.imagem}
              width={160}
              height={160}
              alt={body.nome}
              className="w-20 h-auto cursor-pointer hover:outline-1 outline-primary"
              priority
              onClick={() => {
                sliderRef.current?.slickGoTo(0);
              }}
            />
            {body.imagens_adicionais.map((image, idx) => (
              <ImageWithFallback
                key={image.url}
                src={image.url}
                width={160}
                height={160}
                alt={body.nome}
                className="w-20 h-auto cursor-pointer hover:outline-1 outline-primary"
                priority
                onClick={() => {
                  sliderRef.current?.slickGoTo(idx + 1);
                }}
              />
            ))}
          </div>
          <div className="w-full md:max-w-[640px] mx-auto">
            <Slider ref={sliderRef} {...settings}>
              {[
                { id: body.imagem, url: body.imagem },
                ...body.imagens_adicionais,
              ].map((image) => (
                <ImageWithFallback
                  key={image.id}
                  src={image.url}
                  width={720}
                  height={720}
                  alt={body.nome}
                  className="h-auto w-full"
                  priority
                />
              ))}
            </Slider>
          </div>
        </div>
        {/* outro */}
        <div className="w-full sm:ml-auto lg:max-w-[480px]">
          <div className="flex flex-col-reverse md:flex-row items-start justify-between">
            {/* preço */}
            <div className="">
              {body.itens_promocao.length !== 0 && (
                <ContadorPromocao produto={body} />
              )}
              <div>
                <Preco produto={body} />
              </div>
              <div className="text-xs text-primary mt-8 space-y-1">
                {/* <p className="">Temos 63 em promoção</p> */}
                {body.itens_promocao.length !== 0 && (
                  <p>
                    Promoção válida de{' '}
                    {dateFormat(body.itens_promocao[0].promocao.data_inicio)}{' '}
                    Até {dateFormat(body.itens_promocao[0].promocao.data_fim)}
                  </p>
                )}
                {body.itens_promocao.length !== 0 && (
                  <p className="text-gray-500">
                    Limitado ao stock existente ou em campanha.
                  </p>
                )}
              </div>
            </div>
            {/* marca */}
            <div className="max-w-[120px] max-h-[120px] mb-4 lg:mb-0 overflow-hidden">
              <Link
                href={`/marcas/${body.marca.id}/${encodeURIComponent(
                  body.marca.nome.replaceAll(' ', '-')
                )}/1`}
              >
                <Image
                  className="ml-auto w-[120px] h-auto"
                  src={body.marca.imagem}
                  alt={body.marca.nome}
                  width={120}
                  height={120}
                  loading="eager"
                />
              </Link>
            </div>
          </div>

          {/* quantidade */}
          <div className="space-y-8 mt-8">
            <div className="w-full flex items-center">
              <div className="flex flex-row items-center gap-1 mt-3">
                <input
                  type="text"
                  className="w-14 text-center p-2 rounded border text-primary outline-none"
                  value={qtd}
                  // disabled
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      setQtd(qtd);
                      return;
                    }
                    setQtd(Number(e.target.value) || 1);
                  }}
                  name="qtd"
                  id="qtd"
                  // disabled
                />
                <div className="flex flex-col">
                  <button
                    className="h-5 overflow-hidden"
                    onClick={() => setQtd((v) => v + 1)}
                    disabled={mutationAdicionar.isPending}
                  >
                    <i className="ri-add-line"></i>
                  </button>
                  <button
                    className="h-5 overflow-hidden"
                    onClick={() => qtd > 1 && setQtd((v) => v - 1)}
                    disabled={mutationAdicionar.isPending}
                  >
                    <i className="ri-subtract-fill"></i>
                  </button>
                </div>
              </div>
              <span className="ml-3 text-xs mt-3">Unidades</span>
            </div>
            {body.roupa && (
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="tamanho">Tamanho</label>
                  <Select
                    onChange={(evt) => {
                      setTamanho(evt.target.value);
                      setSelectedColor({ cor: '', id: '' });
                    }}
                    id="tamanho"
                    className="text-sm"
                  >
                    {Array.from(
                      new Set(
                        body.especificacao!.map(
                          (especificacao) => especificacao.tamanho
                        )
                      )
                    ).map((especificacao) => (
                      <option key={especificacao} value={especificacao}>
                        {especificacao}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-row gap-2">
                  {body.especificacao
                    ?.filter(
                      (especificacao) => especificacao.tamanho === tamanho
                    )
                    ?.map((especificacao) => (
                      <button
                        key={especificacao.id}
                        onClick={() =>
                          setSelectedColor({
                            id: especificacao.id,
                            cor: especificacao.cor,
                          })
                        }
                        style={{
                          backgroundColor: especificacao.cor,
                          transform:
                            selectedColor.id === especificacao.id
                              ? 'scale(1.6)'
                              : '',
                        }}
                        className="w-6 h-6 rounded-full transition"
                      ></button>
                    ))}
                </div>
              </div>
            )}
            <button
              onClick={() => {
                if (
                  body.roupa &&
                  (isEmptyString(tamanho) || isEmptyString(selectedColor.id))
                ) {
                  toast('Por favor selecione o tamanho e a cor', {
                    type: 'warning',
                  });
                  return;
                }

                mutationAdicionar.mutate(
                  {
                    produto: body,
                    quantidade: qtd,
                    cor: body.roupa ? selectedColor.cor : undefined,
                    tamanho: body.roupa ? tamanho : undefined,
                  },
                  {
                    onSuccess() {
                      toast(`Adicionado ${qtd} unidade(s)`, {
                        type: 'success',
                        autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                      });
                    },
                    onError(error) {
                      toast(error.message, { type: 'error' });
                    },
                  }
                );
              }}
              className="w-full lg:w-auto p-3 text-white font-bold bg-primary hover:bg-primary/80 transition-colors flex justify-center items-center rounded disabled:cursor-progress"
              disabled={mutationAdicionar.isPending}
            >
              <i className="text-lg ri-shopping-cart-line mr-2"></i>
              {mutationAdicionar.isPending ? 'Adicionando' : 'Adicionar'}
            </button>
          </div>

          {/* disponibilidade */}
          <div className="border rounded-lg p-4 mt-8">
            <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-start sm:items-center">
              <span className="font-bold text-sm">Disponibilidade</span>
              <div className="w-full sm:w-auto p-2 rounded-lg bg-slate-900 text-white flex flex-row justify-center items-center gap-2">
                <i className="ri-truck-fill"></i>
                <p className="text-xs">
                  Entrega prevista a{' '}
                  <span className="font-bold">17 de Novembro</span>
                </p>
              </div>
            </div>
            <ul className="mt-8 text-sm space-y-3">
              <li>
                <div className="before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-primary/80 before:rounded-full before:mr-3">
                  Online<span className="ml-2 text-gray-500">Disponível</span>
                </div>

                <p className="text-xs ml-5 text-primary/80">
                  Entrega prevista em 17 de Novembro
                </p>
              </li>
              <li>
                <div className="before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-primary/80 before:rounded-full before:mr-3">
                  Online<span className="ml-2 text-gray-500">Disponível</span>
                </div>

                <p className="text-xs ml-5 text-primary/80">
                  Entrega prevista em 17 de Novembro
                </p>
              </li>
            </ul>
          </div>

          {/* <Link
            href="#"
            className="inline-block mt-4 text-center text-primary font-bold w-full p-4 rounded hover:bg-primary/50 bg-primary/40 transition-colors"
          >
            Pedido de Informações
          </Link>
          <Link
            href="#"
            className="inline-block mt-4 text-center text-primary/60 font-bold w-full p-4 rounded border hover:border-primary/50 border-primary/40 transition-colors"
          >
            Reportar erro
          </Link>

          <div className="flex bg-primary/40 rounded-t-lg py-4 mt-4 text-sm flex-row justify-around">
            <Link href={"#"}>serviços</Link>
            <Link href={"#"}>Ver stock da loja</Link>
          </div> */}
        </div>
      </div>

      <h2 className="mt-8 px-3 md:px-0 uppercase font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
        Especificações
      </h2>

      <div className="bg-white dark:bg-gray-950 p-3 md:p-6 rounded-lg shadow-lg mt-8 gap-4">
        {body.descricao && (
          <ul
            className="space-y-3 list-[square] list-inside"
            // className="whitespace-break-spaces"
            style={{ fontFamily: 'inherit' }}
          >
            {body.descricao?.split('\n').map((paragraph, index) => (
              <li key={index} className="">
                {paragraph}
              </li>
            ))}
          </ul>
        )}

        <ul className="space-y-1 mt-4 first:mt-0 list-disc list-inside">
          {body.caracteristica.map((caracteristica) => (
            <li key={caracteristica.id}>
              {caracteristica.atributo.nome}: {caracteristica.valor}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="mt-8 px-3 md:px-0 uppercase font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
        Relacionados
      </h2>

      <div className="mx-3 md:mx-0 mt-8">
        {bodyRelated && (
          <ProductContainerRow
            settings={{
              responsive: [
                {
                  breakpoint: 2000,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 1540,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 1350,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 828,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 540,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
              ],
            }}
          >
            {body &&
              bodyRelated?.produtos
                .filter((produto) => produto.referencia !== product_name)
                .map((produto) => (
                  <Product key={produto.id} produto={produto} />
                ))}
          </ProductContainerRow>
        )}
      </div>
    </div>
  );
}

export default DetailsScreen;
