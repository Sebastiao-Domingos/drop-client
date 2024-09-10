"use client";

import { Button } from "@/components/Buttons/Button";
import InputPhoneNumber from "@/components/InputPhoneNumber";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";
import useActionGerarCodigo from "@/hooks/gerarCodigo/useActionGerarCodigo";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function ResetPassword() {
  const router = useRouter();
  const [whatsapp, setWhatsapp] = useState("");
  const { mutationNovoCodigo } = useActionGerarCodigo();

  return (
    <div className="max-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950/60 shadow-md rounded-lg">
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl text-center">Recuperar senha</h1>
          <p className="text-gray-400 text-center text-sm">
            Digite o seu whatsapp para recuperar a sua senha!
          </p>
        </div>
        <div className="space-y-3">
          <InputPhoneNumber
            // {...register("contacto")}
            defaultCountry="ao"
            className="!mb-2 rounded focus-within:ring-1 ring-primary"
            required
            value={whatsapp}
            onChange={(phone) => {
              setWhatsapp(phone);
            }}
            disabled={mutationNovoCodigo.isPending}
          />

          <Button
            label=""
            onClick={() => {
              mutationNovoCodigo.mutate(
                {
                  whatsapp: whatsapp.replace("+", ""),
                },
                {
                  onSuccess(data) {
                    toast(data.message, {
                      type: "success",
                      autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                    });
                    router.push("/reset-password/" + whatsapp.replace("+", ""));
                  },
                  onError(error) {
                    toast(error.message || "Erro ao enviar código", {
                      type: "error",
                    });
                  },
                }
              );
            }}
            disabled={mutationNovoCodigo.isPending}
            className="w-full"
          >
            Enviar código de recuperação
          </Button>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-slate-950 text-primary text-xs p-6">
        <p className="flex flex-row items-center gap-2">
          <span className="material-symbols-outlined">report</span>
          Certifique-se de que a sua conta está vinculada a este whatsapp
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
