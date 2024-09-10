'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import Product from '@/components/Product';
import ProductContainerColumn from '@/components/Product/ProductContainerColumn';
import ProductsHeader from '@/components/Product/ProductsHeader';
import ProductContainerColumnLoader from '@/components/Skeleton/Loaders/Product/ProductContainerColumnLoader';
import { GetProdutoResponse } from '@/controllers/Produto';
import { useGetMarca } from '@/hooks/useGetMarca';
import { useGetProduto } from '@/hooks/useGetProduto';
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MarcaPageProps {
  params: {
    marca_id: string;
    marca_nome: string;
    page: number;
  };
}

function MarcaPage({ params }: MarcaPageProps) {
  const { result, body, query } = useGetProduto<GetProdutoResponse>({
    marca_id: params.marca_id,
    currentPage: Number(params.page),
    peerPage: 20,
  });

  const { result: resultMarcas, body: marcas } = useGetMarca();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <div className="px-2 md:px-0 mb-8">
      <Breadcrumb>
        <BreadcrumbItem name="Página inicial" href="/" />
        <BreadcrumbItem
          onClick={(evt) => {
            evt.preventDefault();
            router.back();
          }}
          name={decodeURIComponent(params.marca_nome.replaceAll('-', ' '))}
          href="#"
        />
      </Breadcrumb>

      <ProductsHeader title={params.marca_nome} />
      {/* <div className="py-8 sticky top-0 bg-slate-100 z-50">
        <h1 className="text-xl uppercase font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
          {decodeURIComponent(params.marca_nome.replaceAll("-", " "))}
        </h1>
      </div>
      <p className="text-sm">
        Nesta secção vai encontrar uma vasta seleção de{" "}
        {decodeURIComponent(params.marca_nome.replaceAll("-", " "))}
      </p>
      <p className="text-sm font-bold">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga in iure
        neque.
      </p> */}
      <div className="mt-8 flex flex-col md:flex-row items-start gap-4">
        <div className="md:block bg-white dark:bg-gray-950 md:sticky top-24 w-full md:w-64 p-4 rounded shadow">
          <div>
            <p
              onClick={() => {
                setVisible(!visible);
              }}
              className="px-1 w-full flex flex-row justify-between items-center cursor-pointer"
            >
              <span className="font-bold">Marcas</span>
              {visible && <i className="ri-arrow-drop-down-line"></i>}
              {!visible && <i className="ri-arrow-drop-up-line"></i>}
            </p>
            <ul className="space-y-1 max-h-32 md:max-h-80 overflow-auto mt-2">
              {visible &&
                resultMarcas.isSuccess &&
                marcas?.map((marca) => (
                  <li
                    key={marca.id}
                    className={`p-1 hover:bg-primary/50 dark:hover:bg-gray-800 hover:text-white rounded cursor-pointer ${
                      marca.id === query.marca_id
                        ? 'bg-primary/50 dark:bg-gray-800 text-white'
                        : ''
                    }`}
                    onClick={() => {
                      router.push(
                        `/marcas/${marca.id}/${encodeURIComponent(
                          marca.nome.replaceAll(' ', '-')
                        )}/1`
                      );
                    }}
                  >
                    {marca.nome}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {result.isSuccess && body.produtos.length === 0 && (
          <div className="w-full text-center py-8">
            <p className="font-bold">UPS!!! Nenhum produto encontrado!</p>
            <Link className="mt-2 text-blue-700" href="/">
              Voltar a página inicial
            </Link>
          </div>
        )}
        {result.isSuccess && body.produtos.length > 0 && (
          <div className="w-full">
            <ProductContainerColumn className="w-full">
              {body.produtos.map((produto) => (
                <Product key={produto.id} produto={produto} />
              ))}
            </ProductContainerColumn>
            <div className="flex w-full justify-center mt-8">
              <Pagination
                onChange={(_, page) => {
                  router.push(
                    `/marcas/${params.marca_id}/${params.marca_nome}/${page}`
                  );
                }}
                page={body?.currentPage || 1}
                count={body?.lastPage || 1}
                color="primary"
              />
            </div>
          </div>
        )}

        {result.isLoading && (
          <div className="w-full">
            <ProductContainerColumnLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default MarcaPage;
