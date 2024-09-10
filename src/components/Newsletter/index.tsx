// "use client";
import { NewsletterCreateData } from "@/services/newsletter";
import { useForm } from "react-hook-form";
import InputPhoneNumber from "../InputPhoneNumber";
import { useState } from "react";
import { Button } from "../Buttons/Button";
import { useActionNewsletter } from "@/hooks/client/newsletter/useActionNewsletter";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_TIME_VISIBILITY } from "@/helpers/constants";

function Newsletter() {
  const [whatsapp, setWhatsapp] = useState("");
  const { handleSubmit, register } = useForm<NewsletterCreateData>();
  const { mutationSubscribe } = useActionNewsletter();

  const handleSubscribe = (data: NewsletterCreateData) => {
    data.whatsapp = data.whatsapp.replaceAll("+", "");
    data.whatsapp = data.whatsapp.replaceAll(" ", "");
    mutationSubscribe.mutate(data, {
      onSuccess() {
        toast("Subscrito com sucesso!", {
          type: "success",
          autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
          onClose: mutationSubscribe.reset,
        });
      },
      onError(err) {
        toast(err.message, {
          type: "error",
          autoClose: DEFAULT_TOAST_TIME_VISIBILITY,
          onClose: mutationSubscribe.reset,
        });
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-950 shadow rounded px-4 py-8 my-[77px]">
      <div className="mb-3 text-center">
        <h3 className="text-2xl text-primary uppercase mb-1">NEWSLETTER</h3>
        <p className="text-gray-600/75 text-sm">
          Seja o primeiro a receber as nossas novidades assinando já a nossa
          Newsletter e receba as novidades por email
        </p>
      </div>
      <form action="#" method="post" onSubmit={handleSubmit(handleSubscribe)}>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <div className="relative w-full md:w-auto">
            <i className="absolute text-gray-400 text-xl top-2 left-2 ri-phone-line"></i>
            <InputPhoneNumber
              {...register("whatsapp")}
              defaultCountry="ao"
              inputClassName={"md:w-[480px]"}
              required
              value={whatsapp}
              onChange={(phone) => {
                setWhatsapp(phone);
              }}
            />
          </div>

          <Button
            label="Assinar"
            isLoading={mutationSubscribe.isPending}
            className="w-full md:w-auto"
          >
            <i className="ri-mail-send-line mr-2"></i>
          </Button>
        </div>
        <div className="text-center">
          <label
            htmlFor="confirmar"
            className="mt-4 text-xs flex justify-center items-start xs:items-center gap-2 text-gray-900 dark:text-gray-300"
          >
            <input
              type="checkbox"
              name="confirmar"
              id="confirmar"
              className="accent-primary w-[16px] h-[16px] border-[1px] border-accent-primary/50"
              required
            />
            Concordo com a política de privacidade
          </label>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
