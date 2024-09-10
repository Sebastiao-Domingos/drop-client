"use client";

import React, { useRef, useState } from "react";
import Modal, { ModalAnimatedContent } from "../Modals";
import * as Dialog from "@radix-ui/react-dialog";
import GerarQrCode from "./GerarQrCode";
import { useReactToPrint } from "react-to-print";

interface ViewAndPrintQrCodeModalProps {
  valor: string;
  isQrCodeGenerated?: boolean;
  onGenerateQrcode?: () => void;
}

function ViewAndPrintQrCodeModal({
  valor,
  isQrCodeGenerated,
  onGenerateQrcode,
}: ViewAndPrintQrCodeModalProps) {
  // const [gerarQr, setGerarQr] = useState(false);
  const qrcodeRef = useRef<HTMLDivElement>(null);
  const printerHandler = useReactToPrint({
    documentTitle: "Meu Qrcode",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
    copyStyles: true,
  });

  return (
    <Modal>
      <Dialog.Trigger
        className={`rounded p-2 text-white hover:bg-primary/70 active:bg-primary/90 ${
          isQrCodeGenerated ? "bg-primary/80" : "bg-primary"
        }`}
      >
        {isQrCodeGenerated && "Ver o qrcode"}
        {!isQrCodeGenerated && "Gerar qrcode"}
      </Dialog.Trigger>
      <ModalAnimatedContent className="top-1/2 -translate-y-1/2 max-h-[90vh] rounded">
        <div className="sticky top-0 flex justify-between items-center bg-white shadow p-6 dark:bg-gray-900 dark:border-b dark:border-b-gray-800">
          <div>
            <h2 className="font-bold text-2xl">Qrcode da encomenda</h2>
            {/* <p className="text-xs">
              Os campos marcados com (<span className="text-red-600">*</span>)
              são obrigatórios
            </p> */}
          </div>
          <Dialog.Close>
            <i className="ri-close-line text-xl"></i>
          </Dialog.Close>
        </div>
        <div className="p-6">
          {!isQrCodeGenerated && (
            <div className="text-center">
              <button
                className="bg-green-600 rounded p-2 text-white hover:bg-green-500"
                onClick={onGenerateQrcode}
                // onClick={() => setGerarQr(true)}
              >
                Gerar
              </button>
            </div>
          )}
          {isQrCodeGenerated && (
            <>
              <GerarQrCode ref={qrcodeRef} valor={valor} />
              <div className="text-center mt-4">
                <button
                  className="bg-primary rounded p-2 text-white hover:bg-primary/80 active:bg-primary/90"
                  onClick={() => printerHandler(null, () => qrcodeRef.current)}
                >
                  Imprimir
                </button>
              </div>
            </>
          )}
        </div>
      </ModalAnimatedContent>
    </Modal>
  );
}

export default ViewAndPrintQrCodeModal;
