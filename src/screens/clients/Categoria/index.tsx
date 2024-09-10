'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import ItemImageTextVetical from '@/components/Skeleton/Loaders/ItemImageTextVetical';
import { useGetSubcategoria } from '@/hooks/useGetSubcategoria';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface CategoriaScreenProps {
  params: {
    categoria_id: string;
    categoria_nome: string;
  };
}

function CategoriaScreen({ params }: CategoriaScreenProps) {
  const { result, body } = useGetSubcategoria(params.categoria_id);
  const searchParams = useSearchParams();

  return (
    <div className="w-full mb-14">
      <Breadcrumb className="">
        <BreadcrumbItem name="Página inicial" href="/" />
        <BreadcrumbItem
          name={decodeURIComponent(searchParams.get('categoria') || '')}
          href="#"
        />
      </Breadcrumb>
      {/* <div className="w-full mb-4">
        <h3 className="text-xl text-primary text-center">Produtos</h3>
      </div> */}
      <div className="px-6 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
        {result.isSuccess &&
          body?.map((subcategoria) => {
            return (
              <Link
                key={subcategoria.id}
                href={`/category/${
                  subcategoria.categoria_id
                }/${encodeURIComponent(
                  subcategoria.categoria.nome.replaceAll(' ', '-')
                )}/subcategory/${
                  subcategoria.id
                }/${subcategoria.nome.replaceAll(
                  ' ',
                  '-'
                )}?subcategoria=${encodeURIComponent(subcategoria.nome)}`}
                className={
                  'p-4 shadow-lg rounded-lg hover:outline-1 hover:outline hover:outline-primary hover:border-primary text-center bg-white dark:bg-gray-950 w-[10rem] h-[12rem]'
                }
                // className={
                //   "p-4 shadow rounded hover:border hover:border-primary text-center w-[10rem] h-[12rem]"
                // }
              >
                <div className="w-[128px] h-[128px] overflow-hidden">
                  <Image
                    src={subcategoria.imagem}
                    width="100"
                    height="100"
                    alt={subcategoria.nome}
                    className="w-[300px] rounded-md"
                  />
                </div>
                <p className="text-sm mt-2 line-clamp-2">{subcategoria.nome}</p>
              </Link>
            );
          })}

        {result.isLoading && (
          <>
            {new Array(8).fill('').map((_, index) => (
              <ItemImageTextVetical key={index} />
            ))}
          </>
        )}
      </div>
      {/* {(result.isLoading || result.isPlaceholderData) && (
        <p className="text-center animate-bounce">Carregando subcategorias</p>
      )} */}
      {result.isSuccess && body?.length === 0 && (
        <div className="text-center flex justify-between flex-col gap-6">
          <p className="text-center">Nenhuma subcategoria encontrada</p>
          <Link href={'/'} className="text-primary hover:underline">
            Voltar a página inicial
          </Link>
        </div>
      )}
      {result.isError && (
        <div className="text-center">
          <p className="text-red-600">
            Ocorreu um erro ao carregar subcategorias!
          </p>
          <Link href={'/'} className="text-primary hover:underline">
            Voltar a página inicial
          </Link>
        </div>
      )}
    </div>
  );
}

export default CategoriaScreen;
