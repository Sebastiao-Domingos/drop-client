import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import React from 'react';

export default function PerguntasFrequentes() {
  return (
    <div className="m-auto max-w-[800px] flex justify-start items-center flex-col">
      <div className="w-full px-2 first-letter:md:px-0">
        <Breadcrumb className="text-sm">
          <BreadcrumbItem href="/" name="Home" />
          <BreadcrumbItem
            href="/perguntasfrequente"
            name="Perguntas frequentes"
          />
        </Breadcrumb>
        <div className="/px-4 md:px-0">
          <h2 className="uppercase font-bold text-sm md:text-base">
            Perguntas Frequentes
          </h2>
        </div>
      </div>
    </div>
  );
}
