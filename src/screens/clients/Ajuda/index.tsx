'use client';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import { useRouter } from 'next/navigation';
import React from 'react';

const catalogos = [
  {
    icon: 'ri-contacts-line',
    body: 'Fala connosco',
    url: '/contactus',
  },
  {
    icon: 'ri-currency-line',
    body: 'Saber mais sobre o pagamento',
    url: '/infopayment',
  },
  {
    icon: 'ri-car-washing-line',
    body: 'Saber mais sobre custos de envio',
    url: '/custoenvio',
  },
  {
    icon: 'ri-slack-line',
    body: 'Saber mais sobre condições de utilização',
    url: '/condicoesutilizacao',
  },
  {
    icon: 'ri-question-answer-line',
    body: 'Perguntas Frequentes',
    url: '/perguntasfrequente',
  },
];

export default function Ajuda() {
  const router = useRouter();
  return (
    <div className="m-auto max-w-[800px] flex justify-start items-center flex-col">
      <div className="w-full px-2 first-letter:md:px-0">
        <Breadcrumb className="text-sm">
          <BreadcrumbItem href="/" name="Home" />
          <BreadcrumbItem href="/help" name="Ajuda" />
        </Breadcrumb>
        <div className="/px-4 md:px-0">
          <h2 className="uppercase font-bold text-sm md:text-base">Ajuda</h2>
        </div>
        <div className="w-full pt-6">
          <p>
            Seleciona umas das opções abaixo para especificar o tipo de ajuda
          </p>
          <div className="mt-4 space-y-4">
            {catalogos.map((catalogo, index) => (
              <button
                className="w-full h-[70px] rounded border flex justify-start gap-6 items-center p-4 hover:bg-primary/10"
                key={index}
                onClick={() => router.push(catalogo.url)}
              >
                <span className="">
                  <i
                    className={`${catalogo.icon} text-xl md:text-4xl text-primary`}
                  ></i>
                </span>
                <span className="text-start">{catalogo.body}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
