"use client";
import React, { ComponentProps } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
export default function PaymentModalInfo() {
  return (
    <div className="max-w-[800px]">
      <div className="flex px-2 py-4 border rounded gap-4 bg-primary/10">
        <div className="w-[110px] h-[30px] md:w-[90px] md:h-[60px] rounded-full bg-primary flex justify-center items-center">
          <div className="text-xs md:text-3xl text-center text-white font-bold">
            1
          </div>
        </div>
        <p className="text-xs md:tex-sm dark:md:text-sm">
          Escolhe os produtos que pretendes, adiciona ao carrinho e finaliza a
          encomenda. Ao chegar à área dos métodos de pagamento selecciona Pagar
          com Multicaixa Express.
        </p>
      </div>
      <div className="flex">
        <Image
          src="/images/paymentinfo/qr-passo-3.jpg"
          alt="multicaixa express"
          width={100}
          height={100}
          className="w-full"
        />
      </div>
    </div>
  );
}

interface ImageInfoProps extends ComponentProps<"div"> {
  src: string;
  alt: string;
}
export function ImageInfo({
  alt,
  src,
  className = "",
  ...others
}: ImageInfoProps) {
  return (
    <div className={twMerge("flex", className)} {...others}>
      <Image src={src} alt={alt} width={100} height={100} className="w-full" />
    </div>
  );
}

interface LabelInfoProps extends ComponentProps<"div"> {
  info: string;
  index: number;
}
export function LabelInfo({
  index,
  info,
  className = "",
  ...others
}: LabelInfoProps) {
  return (
    <div
      className={twMerge(
        "flex px-2 py-4 border rounded gap-4 bg-primary/10",
        className
      )}
      {...others}
    >
      <div className="w-[60px] max-h-[60px] rounded-full bg-primary justify-center items-center">
        <div className="text-xl md:text-3xl text-center text-white font-bold">
          {index}
        </div>
      </div>
      <p className="dark:text-sm">{info}</p>
    </div>
  );
}
