import Image from "next/image";
import React, { useState } from "react";
import IPaymentMethod from "./IPaymentMethod";
import QrCodeExternalWeb from "./qr-code-external-web";
import { useStatus } from "@/hooks/useLoadingStatus";
import LoadingStatus from "../../../../../@types/LoadingStatus";
import { paymentQrcodeAction } from "@/actions/payment-by-qrcode";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { toast } from "react-toastify";

interface QrCodeProps extends IPaymentMethod {
  encomenda_id: string;
}

function QrCode({ deselectedOption, encomenda_id }: QrCodeProps) {
  const [{ showWebFrame, emis_base_url }, setWebFrameData] = useState({
    showWebFrame: false,
    emis_base_url: "",
  });
  const [qrcodeId, setQrcodeId] = useState("");

  const { status, setStatus } = useStatus();

  return (
    <div className="min-w-[300px] sm:min-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
      <div className="relative bg-primary">
        <button
          className="p-3 text-white bg-white/10 w-12 h-12 rounded-full absolute top-1/2 left-6 -translate-y-1/2"
          onClick={deselectedOption}
        >
          <i className="ri-arrow-left-line"></i>
        </button>
        <div className="space-y-2 p-6">
          <div className="flex justify-center">
            <Image
              width={120}
              height={120}
              alt="dunorte solutions"
              src={"/images/logobranco.svg"}
              className="w-[120px] h-auto"
              priority
            />
          </div>
          <p className="text-white text-center text-sm">
            Pagamento por QR code
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col items-start xs:flex-row xs:justify-center gap-6">
        <div className="w-full space-y-2">
          <p className="text-center mb-2">Prosseguir com o pagamento</p>
          <button
            disabled={LoadingStatus.LOADING === status}
            onClick={async () => {
              setStatus(LoadingStatus.LOADING);

              const response = await paymentQrcodeAction(encomenda_id);

              if (typeof response !== "string") {
                setQrcodeId(() => response.data.id);
                setWebFrameData((prev) => ({
                  ...prev,
                  emis_base_url: response.emis_url,
                  showWebFrame: true,
                }));
              } else {
                toast(response || "Erro ao gerar o QR code", { type: "error" });
              }
              setStatus(LoadingStatus.DONE);
            }}
            className="w-full bg-primary disabled:bg-gray-400 py-3 text-white text-center rounded disabled:hover:bg-gray-400 disabled:cursor-progress hover:bg-primary/80 transition-colors"
          >
            {status === LoadingStatus.DONE && "Continuar"}
            {status === LoadingStatus.LOADING && "Gerando qr code"}
          </button>
          {showWebFrame && !isEmptyString(qrcodeId) && (
            <QrCodeExternalWeb
              id={qrcodeId}
              emis_base_url={emis_base_url}
              closeModal={() => {
                setWebFrameData((prev) => ({ ...prev, showWebFrame: false }));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QrCode;
