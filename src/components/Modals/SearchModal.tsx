'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState, createRef, useEffect, useRef } from 'react';
import Modal, { ModalAnimatedContent } from '.';
import { GetProdutoResponse } from '@/controllers/Produto';
import React from 'react';
import { useGetProdutoByNome } from '@/hooks/useGetProdutoByNome';
import Image from 'next/image';
import Link from 'next/link';
import { numberToMoney } from '@/helpers/functions/numberToMoney';
import { useQueryClient } from '@tanstack/react-query';

interface SearchModalProps {
  children: React.ReactNode;
  setOpened?: (state: boolean) => void;
}

function SearchModal({ children, setOpened }: SearchModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const inputRef = createRef<HTMLInputElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  const { result, nome, setNome, body } =
    useGetProdutoByNome<GetProdutoResponse>();
  const queryClient = useQueryClient();

  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const [productName, setProductName] = useState('');

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setNome(productName);
    }, 1000);

    return () => {
      queryClient.cancelQueries({ queryKey: ['produtos'] });
      clearTimeout(timeout?.current);
    };
  }, [productName, setNome, queryClient]);

  useEffect(() => {
    if (isModalVisible) inputRef.current?.focus();
  }, [isModalVisible, inputRef]);

  return (
    <Modal
      onOpenChange={(visible) => {
        setIsModalVisible(visible);
        if (setOpened) setOpened(visible);
      }}
    >
      <Dialog.Trigger ref={triggerRef} asChild>
        {children}
      </Dialog.Trigger>
      <ModalAnimatedContent className="p-4">
        <div className="flex flex-row items-center mb-4">
          <h3 className="flex flex-row items-center lg:text-xl font-bold text-primary">
            <i className="ri-search-line mr-1 text-primary/70 dark:text-slate-400"></i>
            <span className="border-l pl-2 dark:border-l-slate-800">
              Pesquisa
            </span>
          </h3>
          <Dialog.Close className="absolute ml-auto top-4 right-4 text-2xl">
            <i className="ri-close-line"></i>
          </Dialog.Close>
        </div>
        <div className="flex items-center mb-4 rounded-full">
          <input
            ref={inputRef}
            value={productName}
            type="text"
            name="search"
            id="search"
            placeholder="Digite aqui o que deseja"
            className="w-full outline-none py-2 rounded-full px-4 focus:bg-primary/5 border dark:border-gray-800 focus:border-primary/50 dark:focus:border-primary/50"
            onInput={(event) => setProductName(event.currentTarget.value)}
          />
        </div>
        <Dialog.Title>
          {result.isPlaceholderData || result.isLoading ? 'Pesquisando' : ''}
        </Dialog.Title>
        <div className="max-h-[360px] overflow-auto">
          {result.isSuccess &&
            nome.trim() &&
            body.produtos.map((produto) => (
              <Link
                onClick={() => triggerRef.current?.click()}
                href={`/category/${produto.sub_produto.sub_categoria.categoria
                  .id!}/${produto.sub_produto.sub_categoria.categoria.nome.replaceAll(
                  ' ',
                  '-'
                )}/subcategory/${
                  produto.sub_produto.sub_categoria.id
                }/${produto.sub_produto.sub_categoria.nome.replaceAll(
                  ' ',
                  ''
                )}/subproduct/${produto.sub_produto.id}/product/${
                  produto.referencia
                }`}
                className="flex flex-row items-center gap-4 p-4 first:rounded-t last:rounded-b bg-gray-300/50 even:bg-gray-300/20 border border-transparent dark:border-transparent hover:border-primary/50 dark:even:dark:bg-slate-950/40 dark:bg-slate-950/60 dark:hover:border-primary/50"
                key={produto.id}
              >
                <Image
                  className="w-12 h-auto"
                  src={produto.imagem}
                  height={48}
                  width={120}
                  alt={produto.nome}
                  priority
                />
                <div className="flex flex-col">
                  <p className="text-primary font-bold line-clamp-1">
                    {produto.nome}
                  </p>
                  <p className="text-xs">{numberToMoney(produto.preco)}</p>
                </div>
              </Link>
            ))}
          {result.isSuccess && nome.trim() && body.produtos.length == 0 && (
            <p>
              Nenhum resultado para{' '}
              <span className="font-bold italic">{nome}</span>
            </p>
          )}

          {result.isSuccess && nome.trim() && body.produtos.length > 0 ? (
            <Link
              onClick={(evt) => {
                triggerRef.current?.click();
              }}
              className="block mt-1 text-center text-primary dark:text-primary text-sm sticky bottom-0 dark:bg-slate-900 bg-white pt-1"
              href={`/search/${encodeURIComponent(nome)}`}
            >
              Ver todos os resultados
            </Link>
          ) : (
            ''
          )}
        </div>
      </ModalAnimatedContent>
    </Modal>
  );
}

export default React.memo(SearchModal);
