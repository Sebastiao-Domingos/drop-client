'use client';
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';

import * as Tabs from '@radix-ui/react-tabs';
import ExpressPaymentInfo from './expresspaymentinfo';
import QrCodePaymentInfo from './qrcodepayment';

export default function InfoPayment() {
  return (
    <div className="m-auto max-w-[800px] flex justify-start items-center flex-col">
      <div className="w-full px-2 first-letter:md:px-0">
        <Breadcrumb className="text-sm">
          <BreadcrumbItem href="/" name="Home" />
          <BreadcrumbItem href="/infopayment" name="Modos de pagamento" />
        </Breadcrumb>
        <div className="/px-4 md:px-0">
          <h2 className="uppercase font-bold text-sm md:text-base">
            Informações sobre diferentes modos de pagamentos
          </h2>
        </div>
        <div className="w-full /px-2 md:p-0">
          <Tabs.Root className="w-full mt-10" defaultValue="express">
            <Tabs.List className="border-b dark:border-b-gray-800 overflow-auto flex flex-nowrap">
              <Tabs.Trigger
                value="express"
                className="pb-2 truncate px-0 md:px-3 text-xs md:text-base hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]=font-bold data-[state=active]:text-primary"
              >
                Pagar pelo multicaixa Express
              </Tabs.Trigger>
              <Tabs.Trigger
                value="qrcode"
                className="pb-2 truncate pl-2 md:px-3 text-xs md:text-base hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-primary"
              >
                Pagar através de Code QR
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="express" className="mt-6">
              <ExpressPaymentInfo />
            </Tabs.Content>
            <Tabs.Content value="qrcode" className="mt-6">
              <QrCodePaymentInfo />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
