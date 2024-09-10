import PaymentModalInfo from "@/components/Info/PaymentModalInfo";
import React from "react";

export default function QrCodePaymentInfo() {
  return (
    <div className="m-auto max-w-[800px] flex justify-start items-center flex-col">
      <div className="space-y-7 /mt-8 w-full">
        {/* <h2 className="pl-2 border-l-2 border-l-primary md:text-xl">
          Pagamento por Código QR
        </h2> */}
        <p className="text-xs md:text-base">
          Para comprar e pagar a tua encomenda através de Código QR segue as
          instruções abaixo:
        </p>
      </div>
      <div className="flex flex-col gap-8 mt-8">
        <PaymentModalInfo></PaymentModalInfo>
        <PaymentModalInfo></PaymentModalInfo>
        <PaymentModalInfo></PaymentModalInfo>
      </div>
    </div>
  );
}
