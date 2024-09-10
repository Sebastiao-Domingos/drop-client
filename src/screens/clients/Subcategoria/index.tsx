'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import ItemImageTextVetical from '@/components/Skeleton/Loaders/ItemImageTextVetical';
import { useGetSubproduto } from '@/hooks/useGetSubproduto';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useSearchParams } from "next/navigation";

interface SubcategoriasScreenPops {
  params: {
    subcategoria_id: string;
    subcategoria: string;
  };
}

function SubcategoriasScreen({ params }: SubcategoriasScreenPops) {
  const { result, body } = useGetSubproduto(params.subcategoria_id);
  const navigator = useRouter();
  //   const searchParams = useSearchParams();

  return (
    <div className="w-full mb-14">
      <Breadcrumb className="">
        <BreadcrumbItem name="Página inicial" href="/" />
        {result.isSuccess && body && body.length !== 0 && (
          <BreadcrumbItem
            name={body[0].sub_categoria.categoria.nome}
            href={`/category/${
              body[0].sub_categoria.categoria.id
            }/${body[0].sub_categoria.categoria.nome.replaceAll(
              ' ',
              '-'
            )}?categoria=${encodeURIComponent(
              body[0].sub_categoria.categoria.nome
            )}`}
          />
        )}
        {result.isSuccess && body && body.length !== 0 && (
          <BreadcrumbItem
            name={body[0].sub_categoria.nome}
            href={`/category/${
              body[0].sub_categoria.categoria.id
            }/${body[0].sub_categoria.categoria.nome.replaceAll(
              ' ',
              '-'
            )}/subcategory/${
              body[0].sub_categoria.id
            }/${body[0].sub_categoria.nome.replaceAll(
              ' ',
              '-'
            )}?subcategoria=${encodeURIComponent(body[0].sub_categoria.nome)}`}
          />
        )}
      </Breadcrumb>

      <div className="px-6 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
        {result.isSuccess &&
          body?.map((subproduto) => {
            const href = `/category/${subproduto.sub_categoria.categoria
              .id!}/${encodeURIComponent(
              subproduto.sub_categoria.categoria.nome.replaceAll(' ', '-')
            )}/subcategory/${
              subproduto.sub_categoria.id
            }/${subproduto.sub_categoria.nome.replaceAll(
              ' ',
              '-'
            )}/subproduct/${subproduto.id}/${subproduto.nome.replaceAll(
              ' ',
              '-'
            )}?subproduto=${encodeURIComponent(subproduto.nome)}`;

            return (
              <Link
                key={subproduto.id}
                href={href}
                className={
                  'p-4 shadow-lg rounded-lg hover:outline-1 hover:outline hover:outline-primary hover:border-primary text-center bg-white dark:bg-gray-950 w-[10rem] h-[12rem]'
                }
              >
                <div className="w-[128px] h-[128px] overflow-hidden">
                  <Image
                    src={subproduto.imagem}
                    width="100"
                    height="100"
                    alt={subproduto.nome}
                    className="w-[300px] rounded-md"
                  />
                </div>
                <p className="text-sm mt-2 line-clamp-2">{subproduto.nome}</p>
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
      {result.isSuccess && body?.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center">Nenhum subproduto encontrada</p>
          <button
            onClick={() => {
              navigator.back();
            }}
            className="text-primary underline hover:text-primary/60 active:text-primary/80"
          >
            Voltar à página anterior
          </button>
        </div>
      )}
      {result.isError && (
        <div className="text-center">
          <p className="text-red-600">
            Ocorreu um erro ao carregar subprodutos!
          </p>
          <button
            onClick={() => {
              navigator.back();
            }}
            className="text-primary underline hover:text-primary/60 active:text-primary/80"
          >
            Voltar à página anterior
          </button>
        </div>
      )}
    </div>
  );
}

export default SubcategoriasScreen;
