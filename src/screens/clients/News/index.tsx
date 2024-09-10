'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import Product from '@/components/Product';
import ProductContainerColumn from '@/components/Product/ProductContainerColumn';
import ProductsHeader from '@/components/Product/ProductsHeader';
import { GetProdutoResponse } from '@/controllers/Produto';
import { useGetProduto } from '@/hooks/useGetProduto';
import Link from 'next/link';

function News() {
  const { result, body } = useGetProduto<GetProdutoResponse>({
    peerPage: 12,
    online: 1,
    news: 1,
  });

  return (
    <div className="px-2 md:px-0 mb-8">
      <Breadcrumb>
        <BreadcrumbItem name="Página inicial" href="/" />
        <BreadcrumbItem name="Novidades" href="#" />
      </Breadcrumb>

      <ProductsHeader title="Novidades" />

      <div className="mt-8 flex flex-col md:flex-row items-start gap-4">
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

              {body.produtos.map((produto) => (
                <Product key={produto.id} produto={produto} />
              ))}
            </ProductContainerColumn>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
