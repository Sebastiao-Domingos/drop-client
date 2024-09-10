'use client';

import Product from '@/components/Product';
import ProductContainerColumn from '@/components/Product/ProductContainerColumn';
import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetProdutoResponse } from '@/controllers/Produto';
import Pagination from '@mui/material/Pagination';
import { useGetSubproduto } from '@/hooks/useGetSubproduto';
import { useGetMarca } from '@/hooks/useGetMarca';
import { useGetProduto } from '@/hooks/useGetProduto';
import { useGetCategoria } from '@/hooks/useGetCategoria';
import { useGetSubcategoria } from '@/hooks/useGetSubcategoria';
import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { Button } from '@/components/Buttons/Button';
import ProductLoader from '@/components/Skeleton/Loaders/Product';
import Select from 'react-select';
import { twMerge } from 'tailwind-merge';

interface SearchScreenProps {
  params: {
    query: string;
  };
}

function getQueryParamsToDefaultSelect(
  queries: URLSearchParams,
  field: string
) {
  return queries.has(field) && !isEmptyString(queries.get(field))
    ? {
        value: queries.get(field),
        label: queries.get(field)?.split('|')[0],
      }
    : undefined;
}

function getQueryParamsToFilter(queries: URLSearchParams, field: string) {
  return queries.has(field) && !isEmptyString(queries.get(field))
    ? decodeURIComponent(queries.get(field)?.split('|')[1]!)
    : undefined;
}

function SearchScreen({ params }: SearchScreenProps) {
  const queries = useSearchParams();
  const router = useRouter();

  const { result, filtro, body } = useGetProduto<GetProdutoResponse>({
    nome: decodeURIComponent(params.query) || ' ',
    marca_id: getQueryParamsToFilter(queries, 'marca'),
    sub_produto_id: getQueryParamsToFilter(queries, 'subproduto'),
    categoria_id: getQueryParamsToFilter(queries, 'categoria'),
    sub_categoria_id: getQueryParamsToFilter(queries, 'subcategoria'),
    peerPage: 20,
    currentPage: queries.has('page') ? Number(queries.get('page')) : 1,
    online: 1,
  });

  const { result: subprodutoResult, body: subprodutos } = useGetSubproduto();
  const { result: marcaResult, body: marcas } = useGetMarca();
  const { result: categoriaResult, body: categorias } = useGetCategoria();
  const { result: subcategoriaResult, body: subcategorias } =
    useGetSubcategoria();

  const [nome, setNome] = useState(decodeURIComponent(params.query));

  return (
    <>
      <Breadcrumb className="mb-0 bg-transparent">
        <BreadcrumbItem name="Página inicial" href="/" />
        <BreadcrumbItem name="Pesquisa" href="#" />
      </Breadcrumb>
      <div className="py-6 bg-gray-100 dark:bg-transparent">
        <h1 className="text-center text-3xl font-light mb-6">Pesquisa</h1>
        <form
          method="GET"
          action={`/search/${encodeURIComponent(nome)}`}
          className="flex px-4 flex-col gap-4 max-w-[780px] mx-auto"
        >
          <div>
            <input
              type="text"
              // name="nome"
              className="w-full col-span-2 py-2 px-4 rounded border focus:border-primary/50 outline-none"
              placeholder="Nome do produto"
              defaultValue={decodeURIComponent(params.query) || undefined}
              onChange={(evt) => setNome(evt.target.value)}
              required
            />
          </div>
          <div className="w-auto">
            <div className="grid grid-cols-1 lg:gap-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-center w-full">
              <Select
                instanceId="unique-id-for-this-select-45"
                name="marca"
                placeholder="Marca"
                isClearable={true}
                options={
                  marcaResult.isSuccess
                    ? marcas?.map((marca) => ({
                        value: `${marca.nome}|${marca.id}`,
                        label: marca.nome,
                      }))
                    : undefined
                }
                defaultValue={getQueryParamsToDefaultSelect(queries, 'marca')}
                classNames={{
                  control: (o) =>
                    twMerge(
                      `border rounded outline-none ${
                        o.isFocused && 'border-primary'
                      } hover:border-primary/30 p-1 w-full min-w-[120px] lg:max-w-[220px] dark:bg-gray-700 /focus:border-primary/80 /dark:focus:border-primary`
                    ),
                  // control: (o) =>
                  //   twMerge(
                  //     "p-1 rounded text-primary shadow cursor-pointer outline-none border focus:border-primary/30 dark:focus:border-primary",
                  //     "w-full min-w-[120px] lg:max-w-[220px] rounded-lg border dark:bg-gray-700"
                  //   ),
                  menuList: () => 'p-0',
                  option: (o) =>
                    twMerge(
                      `hover:bg-primary/30 bg-transparent ${
                        o.isSelected && 'bg-primary/80'
                      }`
                    ),
                  menu: () =>
                    'dark:bg-gray-700 rounded border border-primary/40 dark:border-primary shadow-none p-0',
                }}
              />

              <Select
                instanceId="unique-id-for-this-select4664"
                name="categoria"
                placeholder="Categoria"
                isClearable={true}
                options={
                  categoriaResult.isSuccess
                    ? categorias?.map((categoria) => ({
                        value: `${categoria.nome}|${categoria.id}`,
                        label: categoria.nome,
                      }))
                    : undefined
                }
                defaultValue={getQueryParamsToDefaultSelect(
                  queries,
                  'categoria'
                )}
                classNames={{
                  control: (o) =>
                    twMerge(
                      `border rounded outline-none ${
                        o.isFocused && 'border-primary'
                      } hover:border-primary/30 p-1 w-full min-w-[120px] lg:max-w-[220px] dark:bg-gray-700 /focus:border-primary/80 /dark:focus:border-primary`
                    ),
                  // control: (o) =>
                  //   twMerge(
                  //     "p-1 rounded text-primary shadow cursor-pointer outline-none border focus:border-primary/30 dark:focus:border-primary",
                  //     "w-full min-w-[120px] lg:max-w-[220px] rounded-lg border dark:bg-gray-700"
                  //   ),
                  menuList: () => 'p-0',
                  option: (o) =>
                    twMerge(
                      `hover:bg-primary/30 bg-transparent ${
                        o.isSelected && 'bg-primary/80'
                      }`
                    ),
                  menu: () =>
                    'dark:bg-gray-700 rounded border border-primary/40 dark:border-primary shadow-none p-0',
                }}
              />

              <Select
                instanceId="unique-id-for-this-select45543"
                name="subcategoria"
                placeholder="Sub-categoria"
                isClearable={true}
                classNamePrefix={'react-select'}
                options={
                  subcategoriaResult.isSuccess
                    ? subcategorias?.map((subcategoria) => ({
                        value: `${subcategoria.nome}|${subcategoria.id}`,
                        label: subcategoria.nome,
                      }))
                    : undefined
                }
                defaultValue={getQueryParamsToDefaultSelect(
                  queries,
                  'subcategoria'
                )}
                classNames={{
                  control: (o) =>
                    twMerge(
                      `border rounded outline-none ${
                        o.isFocused && 'border-primary'
                      } hover:border-primary/30 p-1 w-full min-w-[120px] lg:max-w-[220px] dark:bg-gray-700 /focus:border-primary/80 /dark:focus:border-primary`
                    ),
                  // control: (o) =>
                  //   twMerge(
                  //     "p-1 rounded text-primary shadow cursor-pointer outline-none border focus:border-primary/30 dark:focus:border-primary",
                  //     "w-full min-w-[120px] lg:max-w-[220px] rounded-lg border dark:bg-gray-700"
                  //   ),
                  menuList: () => 'p-0',
                  option: (o) =>
                    twMerge(
                      `hover:bg-primary/30 bg-transparent ${
                        o.isSelected && 'bg-primary/80'
                      }`
                    ),
                  menu: () =>
                    'dark:bg-gray-700 rounded border border-primary/40 dark:border-primary shadow-none p-0',
                }}
              />

              <Select
                instanceId="unique-id-for-this-selectghjgh"
                name="subproduto"
                placeholder="Sub-produto"
                isClearable={true}
                options={
                  subprodutoResult.isSuccess
                    ? subprodutos?.map((subproduto) => ({
                        value: `${subproduto.nome}|${subproduto.id}`,
                        label: subproduto.nome,
                      }))
                    : undefined
                }
                defaultValue={getQueryParamsToDefaultSelect(
                  queries,
                  'subproduto'
                )}
                classNames={{
                  control: (o) =>
                    twMerge(
                      `border rounded outline-none ${
                        o.isFocused && 'border-primary'
                      } hover:border-primary/30 p-1 w-full min-w-[120px] lg:max-w-[220px] dark:bg-gray-700 /focus:border-primary/80 /dark:focus:border-primary`
                    ),
                  // control: (o) =>
                  //   twMerge(
                  //     "p-1 rounded text-primary shadow cursor-pointer outline-none border focus:border-primary/30 dark:focus:border-primary",
                  //     "w-full min-w-[120px] lg:max-w-[220px] rounded-lg border dark:bg-gray-700"
                  //   ),
                  menuList: () => 'p-0',
                  option: (o) =>
                    twMerge(
                      `hover:bg-primary/30 bg-transparent ${
                        o.isSelected && 'bg-primary/80'
                      }`
                    ),
                  menu: () =>
                    'dark:bg-gray-700 rounded border border-primary/40 dark:border-primary shadow-none p-0',
                }}
              />

              {/* <Select
                name="marca"
                className="w-full min-w-[120px] lg:max-w-[220px] rounded-lg border"
                defaultValue={
                  isEmptyString(queries.get("marca"))
                    ? undefined
                    : queries.get("marca")!
                }
              >
                <option value={""}>-- Marcas --</option>
                {marcaResult.isSuccess &&
                  marcas?.map((marca) => (
                    <option
                      key={marca.id}
                      value={marca.id}
                      defaultChecked={queries.get("marca") === marca.id}
                    >
                      {marca.nome}
                    </option>
                  ))}
              </Select>

              <Select
                name="categoria"
                className="w-full min-w-[120px] lg:max-w-[220px] rounded-lg border"
                defaultValue={queries.get("categoria") || ""}
              >
                <option value={""}>-- Categoria --</option>
                {categoriaResult.isSuccess &&
                  categorias?.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
              </Select>

              <Select
                name="subcategoria"
                className="w-full min-w-[120px] lg:max-w-[220px] rounded-lg border"
                defaultValue={queries.get("subcategoria") || ""}
              >
                <option value={""}>-- Subcategoria --</option>
                {subcategoriaResult.isSuccess &&
                  subcategorias?.map((subcategoria) => (
                    <option key={subcategoria.id} value={subcategoria.id}>
                      {subcategoria.nome}
                    </option>
                  ))}
              </Select>

              <Select
                name="subproduto"
                className="w-full min-w-[120px] lg:max-w-[220px] rounded-lg border"
                defaultValue={queries.get("subproduto") || ""}
              >
                <option value={""}>-- Subprodutos --</option>
                {subprodutoResult.isSuccess &&
                  subprodutos?.map((subproduto) => (
                    <option key={subproduto.id} value={subproduto.id}>
                      {subproduto.nome}
                    </option>
                  ))}
              </Select> */}
            </div>
          </div>
          <div className="sm:w-auto w-full">
            <Button label="" type="submit" className="w-full">
              Pesquisar
            </Button>
          </div>
        </form>
      </div>
      <div className="my-4">
        Foram encontrados <span className="font-bold">{body?.total || 0}</span>{' '}
        de <span className="font-bold">{decodeURIComponent(params.query)}</span>
      </div>
      {result.isSuccess && (
        <ProductContainerColumn className="px-2 lg:px-4 mt-8">
          {body.produtos.map((produto, idx) => (
            <Product produto={produto} key={idx} />
          ))}
        </ProductContainerColumn>
      )}
      {result.isSuccess && body.produtos.length === 0 && (
        <p className="font-bold text-center">Nenhum produto encontrado</p>
      )}
      {(result.isPlaceholderData || result.isLoading) && (
        <ProductContainerColumn className="px-2 lg:px-4 mt-8">
          {Array(14)
            .fill(' ')
            .map((_, index) => (
              <ProductLoader key={index} />
            ))}
        </ProductContainerColumn>
      )}

      <div className="flex w-full justify-center mt-4">
        <Pagination
          onChange={(_, page) => {
            const params = new URLSearchParams(queries);
            params.set('page', page.toString());

            filtro({ currentPage: page });
            router.replace(`?${params.toString()}`);
          }}
          page={body?.currentPage || 1}
          count={body?.lastPage || 1}
          color="primary"
        />
      </div>
    </>
  );
}
export default SearchScreen;
