"use client";

import { Button } from "@/components/Buttons/Button";
import { GroupInputs } from "@/components/Inputs/GroupInputs";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";
import { formatPhoneNumber } from "@/helpers/functions/formatPhoneNumber";
import { useActionRecuperarSenha } from "@/hooks/client/useActionRecuperarSenha";
import useActionGerarCodigo from "@/hooks/gerarCodigo/useActionGerarCodigo";
import { ClienteRecuperarSenha } from "@/services/users/Cliente";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ConfirmNewPasswordProps {
  params: { whatsapp: string };
}

function ConfirmNewPassword({ params }: ConfirmNewPasswordProps) {
  const [code, SetCode] = useState("");
  const { mutationUpdatePassword } = useActionRecuperarSenha();
  const { mutationNovoCodigo } = useActionGerarCodigo();

  const router = useRouter();
  const { register, handleSubmit } = useForm<
    ClienteRecuperarSenha & { confirmarSenha: string }
  >();

  const submit = (data: ClienteRecuperarSenha & { confirmarSenha: string }) => {
    data.code = code;
    if (data.senha.length < 8) {
      toast("Senha não pode ter menos que 8 caracteres!", {
        type: "warning",
        autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
      });
      return;
    }

    if (data.senha !== data.confirmarSenha) {
      toast("Senhas não compatíveis! Por favor verifique a sua senha!", {
        type: "warning",
        autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
      });
      return;
    }

    mutationUpdatePassword.mutate(
      {
        code: data.code,
        whatsapp: params.whatsapp,
        senha: data.senha,
      },
      {
        onSuccess() {
          toast("Senha recuperada", {
            type: "success",
            autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
          });
          router.push("/user/perfil");
        },
        onError(error) {
          toast(error.message || "Erro ao recuperar senha", { type: "error" });
        },
      }
    );
  };

  return (
    <div className="max-w-[480px] my-10 mx-auto bg-white dark:bg-slate-950/60 shadow-md rounded-lg overflow-hidden">
      <div className="space-y-2 p-6 bg-primary/50 dark:bg-primary">
        <h1 className="font-bold text-2xl text-center text-white">
          Recuperação de senha
        </h1>
        <p className="text-white text-center text-sm">
          Enviamos uma mensagem para o seu whatsapp com o código de confirmação
        </p>
      </div>
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(submit)}>
          <fieldset
            className="space-y-6"
            disabled={
              mutationNovoCodigo.isPending || mutationUpdatePassword.isPending
            }
          >
            <div>
              <label
                htmlFor="code"
                className="font-bold text-gray-600 mb-3 inline-block"
              >
                Código de recuperação
              </label>
              <GroupInputs setValue={SetCode} />
              {/* <input
                {...register("code", { required: true })}
                className="w-full p-3 outline-none rounded border focus:border-primary/50"
                type="text"
                name="code"
                id="code"
                placeholder="Código de recuperação"
              /> */}
            </div>
            <div>
              <label
                htmlFor="password"
                className="font-bold text-gray-600 mb-3 inline-block"
              >
                Nova senha
              </label>
              <input
                {...register("senha", { required: true })}
                className="w-full p-2 rounded outline-none border focus:border-primary/50"
                type="password"
                // name="password"
                id="password"
                placeholder="Nova senha"
              />
            </div>
            <div>
              <label
                htmlFor="password-confirm"
                className="font-bold text-gray-600 mb-3 inline-block"
              >
                Confirmar nova senha
              </label>
              <input
                {...register("confirmarSenha", { required: true })}
                className="w-full p-2 rounded outline-none border focus:border-primary/50"
                type="password"
                // name="password-confirm"
                id="password-confirm"
                placeholder="Confirmar nova senha"
              />
            </div>
            <Button
              label=""
              onClick={() => {
                mutationNovoCodigo.reset();
              }}
              className="w-full"
            >
              Recuperar
            </Button>
          </fieldset>
        </form>
      </div>
      <div className="bg-gray-200 dark:bg-slate-950 text-primary text-xs p-6">
        <button
          onClick={() => {
            mutationNovoCodigo.mutate(
              {
                whatsapp: params.whatsapp,
              },
              {
                onError(error) {
                  toast(error.message || "Erro ao enviar código", {
                    type: "error",
                  });
                },
                onSuccess() {
                  toast(mutationNovoCodigo.data!.message, {
                    type: "success",
                    autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
                  });
                },
              }
            );
          }}
          className="w-full text-center text-primary disabled:cursor-progress"
          disabled={mutationNovoCodigo.isPending}
        >
          Enviar novo código para{" "}
          <span className="font-bold">
            {formatPhoneNumber(params.whatsapp)}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ConfirmNewPassword;
