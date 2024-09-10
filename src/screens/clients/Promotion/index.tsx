'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import Product from '@/components/Product';
import ProductContainerColumn from '@/components/Product/ProductContainerColumn';
import { useGetTabarato } from '@/hooks/tabarato/useGetTabarato';
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';
import ProductsHeader from '@/components/Product/ProductsHeader';

function Promotion() {
  const {
    data: body,
    result,
    filtro,
  } = useGetTabarato({
    peerPage: 20,
  });

  return (
    <div className="px-2 md:px-0 mb-8">
      <Breadcrumb>
        <BreadcrumbItem name="Página inicial" href="/" />
        <BreadcrumbItem name="Tá barato" href="#" />
      </Breadcrumb>
      <ProductsHeader title="Tá barato" />
      <div className="mt-8 flex flex-col md:flex-row items-start gap-4">
        {result.isSuccess && body?.produtos.length === 0 && (
          <div className="w-full text-center py-8">
            <p className="font-bold">UPS! Nenhum produdo em promoção!</p>
            <Link className="mt-2 text-blue-700" href="/">
              Voltar a página inicial
            </Link>
          </div>
        )}
        {result.isSuccess && body?.produtos.length! > 0 && (
          <div className="w-full">
            <ProductContainerColumn className="w-full">
              {body?.produtos.map((produto) => (
                <Product key={produto.id} produto={produto} />
              ))}

              {body?.produtos.map((produto) => (
                <Product key={produto.id} produto={produto} />
              ))}
            </ProductContainerColumn>
            <div className="flex justify-center mt-8">
              <Pagination
                onChange={(_, page) => {
                  filtro({ currentPage: page });
                }}
                page={Number(body!.currentPage)}
                count={body!.lastPage || 1}
                color="primary"
              />
              {result.isPlaceholderData && <p>Carregando dados</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Promotion;
