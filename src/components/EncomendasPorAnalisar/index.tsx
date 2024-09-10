"use client";

import { useGetSugestaoItemEncomendaClient } from "@/hooks/encomenda/cliente/sugestaoItemProdutoEncomenda/useGetSugestaoItemEncomenda";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

function EncomendaPorAnalisar() {
  const { data, result } = useGetSugestaoItemEncomendaClient();
  const { user, status } = useAuth();
  const [close, setClose] = useState(false);

  if (status !== "success" || user === undefined) {
    return <></>;
  }

  return (
    <>
      {!close &&
        status === "success" &&
        result.isSuccess &&
        data?.length !== 0 && (
          <div className="absolute inset-0 bg-black/60 z-50 backdrop-blur-sm">
            <div className="w-full sm:max-w-[420px] bg-slate-200 dark:bg-gray-950 rounded-lg overflow-hidden shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="p-3 flex items-center border-b border-b-slate-300 dark:border-b-gray-800">
                <Image
                  src={"/images/mini-logo.svg"}
                  alt="dunorte online"
                  height={120}
                  width={120}
                  className="w-auto h-8"
                />
                <p className="font-bold ml-2">Encomendas</p>
                <button
                  className="ml-auto flex justify-center items-center"
                  onClick={() => setClose(true)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="px-3 py-4">
                <p className="pb-3 text-sm">
                  Encomendas que precisam da tua atenção
                </p>
                {data?.map((sugestao) => (
                  <div
                    key={sugestao.id}
                    className="py-1 border-b border-b-slate-300 dark:border-b-gray-800 last:border-none flex"
                  >
                    <p>
                      Encomenda:{" "}
                      <span className="font-bold">
                        {sugestao.item_encomenda.encomenda.codigo}
                      </span>
                    </p>
                  </div>
                ))}
                <p className="text-center pt-2">
                  <Link
                    href={"/user/sugestion"}
                    className="text-blue-600 underline text-sm"
                  >
                    Gerir items das encomendas
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default EncomendaPorAnalisar;
