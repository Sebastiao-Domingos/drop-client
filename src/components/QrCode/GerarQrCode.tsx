import React, { HTMLAttributes } from "react";
import QRCode from "react-qr-code";
import { twJoin } from "tailwind-merge";

interface GerarQrCodeProps extends HTMLAttributes<HTMLDivElement> {
  valor: string;
}

const GerarQrCode = React.forwardRef<HTMLDivElement, GerarQrCodeProps>(
  ({ valor, className = "", ...others }, ref) => {
    return (
      <div
        ref={ref}
        className={twJoin(
          "w-[300px] h-[300px] mx-auto p-4 !bg-white print:absolute print:top-1/2 print:left-1/2 print:-translate-x-1/2 print:translate-y-1/2",
          className
        )}
        {...others}
      >
        {/* <style type="text/css" media="print">
          {
            "\
  @page { size: 30mm 7mm; }\
"
          }
        </style> */}
        <p className="mb-6 text-3xl font-bold text-center hidden print:block">
          Encomenda Dunorte
        </p>
        <QRCode
          size={256}
          // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          className="h-auto max-w-full w-full"
          value={valor}
          viewBox={`0 0 256 256`}
        />
      </div>
    );
  }
);

GerarQrCode.displayName = "GerarQr";

export default GerarQrCode;
