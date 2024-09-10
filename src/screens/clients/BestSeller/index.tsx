'use client';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import Product from '@/components/Product';
import ProductContainerRow from '@/components/Product/ProductContainerRow';
import ProductsHeader from '@/components/Product/ProductsHeader';
import { GetProdutoResponse } from '@/controllers/Produto';
import { useGetProduto } from '@/hooks/useGetProduto';

function BestSeller() {
  const { result: resultNews, body: bodyNews } =
    useGetProduto<GetProdutoResponse>({
      news: 1,
      peerPage: 6,
    });

  return (
    <>
      <div className="">
        <Breadcrumb>
          <BreadcrumbItem href="/" name="Página inicial" />
          <BreadcrumbItem href="/bestseller" name="Mais vendidos" />
        </Breadcrumb>

        <ProductsHeader title="Mais vendidos" />

        <div className="mt-8">
          {resultNews.isSuccess && bodyNews.produtos.length !== 0 && (
            <ProductContainerRow>
              {bodyNews.produtos.map((produto, idx) => (
                <Product produto={produto} key={idx} />
              ))}
            </ProductContainerRow>
          )}
          {resultNews.isError && (
            <span className="text-red-600">
              Ocorreu um erro ao carregar os produtos!
            </span>
          )}
          {resultNews.isSuccess && bodyNews.produtos.length === 0 && (
            <span className="block mb-5">Nenhum produto encontrado!</span>
          )}
          {(resultNews.isPlaceholderData || resultNews.isLoading) && (
            <span className="">Carregando produtos!</span>
          )}
        </div>
      </div>
    </>
  );
}

export default BestSeller;
