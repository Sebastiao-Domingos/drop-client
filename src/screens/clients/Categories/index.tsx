'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import ItemImageTextVetical from '@/components/Skeleton/Loaders/ItemImageTextVetical';
import { useGetCategoria } from '@/hooks/useGetCategoria';
import Link from 'next/link';

function Categories() {
  const { result, body } = useGetCategoria();
  return (
    <div className="w-full mb-14">
      <Breadcrumb className="">
        <BreadcrumbItem name="Página inicial" href="/" />
        <BreadcrumbItem name="Categorias" href="/categories" />
      </Breadcrumb>
      <div className="px-6 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
        {result.isSuccess &&
          body?.map((categoria) => (
            <Link
              key={categoria.id}
              href={`/category/${categoria.id}/${encodeURIComponent(
                categoria.nome.replaceAll(' ', '-')
              )}?categoria=${categoria.nome}`}
              className={
                'p-4 shadow-lg rounded-lg hover:outline-1 hover:outline hover:outline-primary hover:border-primary text-center bg-white dark:bg-gray-950 w-[10rem] h-[12rem]'
              }
            >
              <div className="w-[128px] h-[128px] overflow-hidden flex justify-center items-center">
                <span className={'material-symbols-outlined text-5xl'}>
                  {categoria.icone}
                </span>
              </div>
              <p className="text-sm mt-2 line-clamp-2">{categoria.nome}</p>
            </Link>
          ))}

        {result.isLoading && (
          <>
            {new Array(8).fill('').map((_, index) => (
              <ItemImageTextVetical key={index} />
            ))}
          </>
        )}
      </div>
      {result.isSuccess && body?.length === 0 && (
        <div className="text-center">
          <p className="text-center">Nenhuma categoria encontrada</p>
          <Link href={'/'} className="text-primary hover:underline">
            Voltar a página inicial
          </Link>
        </div>
      )}
      {result.isError && (
        <div className="text-center">
          <p className="text-red-600">
            Ocorreu um erro ao carregar categorias!
          </p>
          <Link href={'/'} className="text-primary hover:underline">
            Voltar a página inicial
          </Link>
        </div>
      )}
    </div>
  );
}

export default Categories;
