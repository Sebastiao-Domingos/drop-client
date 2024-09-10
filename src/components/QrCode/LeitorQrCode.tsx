"use client";

import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";

function LeitorQrCode() {
  const [lerQr, setLerQr] = useState(false);
  return (
    <>
      {
        <button
          className="bg-blue-600 rounded p-2 text-white hover:bg-blue-500"
          onClick={() => setLerQr(!lerQr)}
        >
          Ler qrcode
        </button>
      }
      {lerQr && (
        <QrScanner
          tracker={false}
          onDecode={(result) => {
            toast(result, {
              type: "warning",
              autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
            });
            setLerQr(false);
          }}
          onError={(error) => console.log(error?.message)}
        />
      )}
    </>
  );
}

export default LeitorQrCode;
