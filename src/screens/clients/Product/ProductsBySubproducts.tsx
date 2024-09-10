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

interface ProdutsBySubproductsProps {
  params: {
    subproduct_id: string;
    others: string[];
  };
}

function ProdutsBySubproducts({ params }: ProdutsBySubproductsProps) {
  const { result, body, query } = useGetProduto<GetProdutoResponse>({
    sub_produto_id: params.subproduct_id,
    currentPage:
      params.others[1] === 'marca'
        ? Number(params.others[4] || 1)
        : Number(params.others[2] || 1),
    peerPage: 20,
    marca_id: params.others[1] === 'marca' ? params.others[2] : undefined,
    online: 1,
  });

  const { result: resultMarcas, body: marcas } = useGetMarca(
    params.subproduct_id
  );
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <div className="px-2 md:px-0 mb-8">
      <Breadcrumb>
        <BreadcrumbItem name="Página inicial" href="/" />

        {result.isSuccess && body.produtos.length !== 0 && (
          <BreadcrumbItem
            name={body.produtos[0].sub_produto.sub_categoria.categoria.nome}
            href={`/category/${
              body.produtos[0].sub_produto.sub_categoria.categoria.id
            }/${body.produtos[0].sub_produto.sub_categoria.categoria.nome.replaceAll(
              ' ',
              '-'
            )}?categoria=${encodeURIComponent(
              body.produtos[0].sub_produto.sub_categoria.categoria.nome
            )}`}
          />
        )}

        {result.isSuccess && body && body.produtos.length !== 0 && (
          <BreadcrumbItem
            name={body.produtos[0].sub_produto.sub_categoria.nome}
            href={`
              /category/${
                body.produtos[0].sub_produto.sub_categoria.categoria.id
              }/${encodeURIComponent(
              body.produtos[0].sub_produto.sub_categoria.categoria.nome.replaceAll(
                ' ',
                '-'
              )
            )}/subcategory/${
              body.produtos[0].sub_produto.sub_categoria.id
            }/${encodeURIComponent(
              body.produtos[0].sub_produto.sub_categoria.nome.replaceAll(
                ' ',
                '-'
              )
            )}?subcategory=${encodeURIComponent(
              body.produtos[0].sub_produto.nome
            )}
            `}
          />
        )}

        {result.isSuccess && body && body.produtos.length !== 0 && (
          <BreadcrumbItem
            name={body.produtos[0].sub_produto.nome}
            href={`
              /category/${
                body.produtos[0].sub_produto.sub_categoria.categoria.id
              }/${encodeURIComponent(
              body.produtos[0].sub_produto.sub_categoria.categoria.nome.replaceAll(
                ' ',
                '-'
              )
            )}/subcategory/${
              body.produtos[0].sub_produto.sub_categoria.id
            }/${encodeURIComponent(
              body.produtos[0].sub_produto.sub_categoria.nome.replaceAll(
                ' ',
                '-'
              )
            )}/subproduct/${
              body.produtos[0].sub_produto.id
            }/${encodeURIComponent(
              body.produtos[0].sub_produto.nome.replaceAll(' ', '-')
            )}
            `}
          />
        )}
      </Breadcrumb>
      <ProductsHeader title={params.others[0]} />

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
                        `
                        /category/${body.produtos[0].sub_produto.sub_categoria
                          .categoria
                          .id!}/${body.produtos[0].sub_produto.sub_categoria.categoria.nome.replaceAll(
                          ' ',
                          '-'
                        )}/subcategory/${
                          body.produtos[0].sub_produto.sub_categoria.id
                        }/${body.produtos[0].sub_produto.sub_categoria.nome.replaceAll(
                          ' ',
                          ''
                        )}/subproduct/${body.produtos[0].sub_produto.id}/${
                          params.others[0]
                        }/marca/${marca.id}`
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
            <button
              className="mt-2 text-primary hover:text-primary/60 active:text-primary/80 underline"
              onClick={() => {
                router.back();
              }}
            >
              Voltar à página anterior
            </button>
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
                  //   filtro({ currentPage: page });
                  if (params.others[1] === 'marca') {
                    router.push(
                      `/category/${
                        body.produtos[0].sub_produto.sub_categoria.categoria.id
                      }/${encodeURIComponent(
                        body.produtos[0].sub_produto.sub_categoria.categoria.nome.replaceAll(
                          ' ',
                          '-'
                        )
                      )}/subcategory/${
                        body.produtos[0].sub_produto.sub_categoria.id
                      }/${encodeURIComponent(
                        body.produtos[0].sub_produto.sub_categoria.nome.replaceAll(
                          ' ',
                          '-'
                        )
                      )}/subproduct/${params.subproduct_id}/${
                        params.others[0]
                      }/marca/${params.others[2]}/page/${page}`
                    );
                  } else {
                    router.push(
                      `/category/${
                        body.produtos[0].sub_produto.sub_categoria.categoria.id
                      }/${encodeURIComponent(
                        body.produtos[0].sub_produto.sub_categoria.categoria.nome.replaceAll(
                          ' ',
                          '-'
                        )
                      )}/subcategory/${
                        body.produtos[0].sub_produto.sub_categoria.id
                      }/${encodeURIComponent(
                        body.produtos[0].sub_produto.sub_categoria.nome.replaceAll(
                          ' ',
                          '-'
                        )
                      )}/subproduct/${params.subproduct_id}/${
                        params.others[0]
                      }/page/${page}`
                    );
                  }
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

export default ProdutsBySubproducts;
