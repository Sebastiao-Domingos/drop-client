'use client';

import { useGetEncomendaClienteDetalhe } from '@/hooks/encomenda/cliente/useGetEncomendaClienteDetalhe';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { redirect, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import TableRowItem from './TableRowItem';
import { numberToMoney } from '@/helpers/functions/numberToMoney';
import PaymentOption, { Payment } from './PaymentOption';
import Express from './payment-method/Express';
import QrCode from './payment-method/QrCode';

interface PaymentProps {
  params: {
    encomenda: string;
    codigo: string;
  };
}

function PaymentPage({ params }: PaymentProps) {
  const [selected, setSelected] = useState(false);

  const [payment, setPayment] = useState<Payment>();

  const pathname = usePathname();

  const { data, result } = useGetEncomendaClienteDetalhe(params.encomenda);

  if (result.isPending) {
    return (
      <div className="w-screen h-screen flex justify-center items-center px-[10px] bg-gray-100 dark:bg-slate-900">
        <div className="min-w-[300px] sm:min-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
          <p className="text-center p-6">Carregando, por favor aguarde...</p>
        </div>
      </div>
    );
  }

  if (result.isError) {
    if (result.error.message === 'Usuário não autorizado') {
      redirect(`/login/?url=${pathname}`);
    }
    return (
      <div className="w-screen h-screen flex justify-center items-center px-[10px] bg-gray-100 dark:bg-slate-900">
        <div className="min-w-[300px] sm:min-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
          <p className="text-center p-6">
            {result.error.message || 'Encomenda não encotrada!'}
          </p>
        </div>
      </div>
    );
  }

  if (data?.pago) {
    redirect('/');
  }

  return (
    <div className="w-screen h-screen px-[10px] bg-gray-100 dark:bg-slate-900 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col justify-center items-center">
        {!selected && (
          <PaymentOption
            setPaymentForm={setPayment}
            setSelectedOption={() => {
              if (payment) {
                setSelected(true);
              }
            }}
            payment={payment}
          />
        )}

        {selected && payment === 'qrcode' && (
          <QrCode
            encomenda_id={params.encomenda}
            deselectedOption={() => setSelected(false)}
          />
        )}
        {selected && payment === 'express' && (
          <Express
            encomenda_id={params.encomenda}
            deselectedOption={() => setSelected(false)}
          />
        )}
      </div>
      <TableContainer
        component={Paper}
        className="mt-2 mx-auto max-w-4xl dark:bg-slate-950"
      >
        <div className="px-4 py-4">
          <p className="md:text-end cursor-default">
            Valor total da compra:{' '}
            <span className="text-lg font-bold">
              {numberToMoney(data?.valor_total.toString())}
            </span>
          </p>
        </div>
        <Table>
          <TableHead>
            <TableRow className="font-bold bg-blue-200/50">
              <TableCell className="!font-bold dark:text-slate-200">
                <span className="sr-only">imagem de produto</span>
              </TableCell>
              <TableCell className="!font-bold dark:text-slate-200">
                Produto
              </TableCell>
              <TableCell className="!font-bold dark:text-slate-200">
                Detalhes
              </TableCell>
              <TableCell className="!font-bold dark:text-slate-200">
                Qtd
              </TableCell>
              <TableCell className="!font-bold dark:text-slate-200">
                Preço unit.
              </TableCell>
              <TableCell className="!font-bold dark:text-slate-200">
                Total
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.itens_encomenda.map((item) => {
              return <TableRowItem key={item.id} item={item} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PaymentPage;
