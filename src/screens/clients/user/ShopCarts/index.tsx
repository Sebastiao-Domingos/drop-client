'use client';

import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import ImageWithFallback from '@/components/ImageWithFallback';
import { numberToMoney } from '@/helpers/functions/numberToMoney';
// import Table, { TBody, THead, Tr } from "@/components/Table";
import { useGetCarrinho } from '@/hooks/useGetCarrinho';
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from '@mui/material';
import Link from 'next/link';

function ShopCarts() {
  const { data, ...result } = useGetCarrinho();

  return (
    <div>
      <div>
        <Breadcrumb className="text-sm">
          <BreadcrumbItem href="/user/perfil" name="A minha Conta" />
          <BreadcrumbItem href="/user/shopcarts" name="Meus carrinhos" />
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <h2 className="uppercase font-bold">Meus Carrinhos</h2>
        {result.isSuccess && data?.carrinho.length !== 0 && (
          <p>
            Total:
            <span className="font-bold pl-1">
              {numberToMoney(data?.valor_total)}
            </span>
          </p>
        )}
      </div>
      <div>
        {result.isSuccess && data?.carrinho.length !== 0 && (
          <TableContainer component={Paper} className="mt-2">
            <Table>
              <TableHead>
                <TableRow className="font-bold bg-blue-200/50">
                  <TableCell className="!font-bold">
                    <span className="material-symbols-outlined">image</span>
                  </TableCell>
                  <TableCell className="!font-bold">Nome</TableCell>
                  <TableCell className="!font-bold">Detalhe</TableCell>
                  <TableCell className="!font-bold">Preço unit.</TableCell>
                  <TableCell className="!font-bold">Qtd</TableCell>
                  <TableCell className="!font-bold">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="dark:bg-gray-900">
                {data?.carrinho.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="w-12 h-12 overflow-hidden">
                        <ImageWithFallback
                          alt={item.produto.nome}
                          height={48}
                          width={48}
                          src={item.produto.imagem}
                          loading="eager"
                          className="h-auto"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="dark:text-white">
                      {item.produto.nome}
                    </TableCell>
                    <TableCell>
                      {item.produto.roupa && (
                        <div className="flex flex-row gap-2">
                          <span className="dark:text-white">
                            {item.tamanho}
                          </span>
                          <span
                            style={{
                              backgroundColor: item.cor,
                            }}
                            className="w-4 h-4 rounded-full inline-block"
                          ></span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="dark:text-white">
                      {numberToMoney(item.produto.preco)}
                    </TableCell>
                    <TableCell className="dark:text-white">
                      {item.quantidade}
                    </TableCell>
                    <TableCell className="dark:text-white">
                      {numberToMoney(
                        (
                          Number(item.produto.preco) * item.quantidade
                        ).toString()
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <p className="text-center mt-6">
          {result.isSuccess && data?.carrinho.length !== 0 && (
            <Link href={'/cart'} className="text-primary">
              Ver carrinho
            </Link>
          )}
          {result.isSuccess && data?.carrinho.length === 0 && (
            <Link href={'/'} className="text-primary">
              Fazer compras
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

export default ShopCarts;
