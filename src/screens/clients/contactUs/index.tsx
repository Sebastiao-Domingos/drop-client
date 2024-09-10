'use client';

// import Body from "@/components/Body";
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import InputPhoneNumber from '@/components/InputPhoneNumber';
// import Footer from "@/components/Footer";
import Select from '@/components/Select';
import { useGetDataUsuario } from '@/hooks/useGetClientes';
import { useEffect, useState } from 'react';
// import Navigation from "@/components/navegation";

export default function ContactUs() {
  const { data, result } = useGetDataUsuario();
  const [message, setMessage] = useState({
    whatsapp: '',
    nome: '',
    body: '',
  });

  useEffect(() => {
    if (data) {
      message.whatsapp = data?.contactos[0].conteudo;
      message.nome = data?.usuario.nome!;
    }
  }, [message, data]);
  return (
    <>
      <div className="m-auto max-w-[800px] flex justify-start items-center flex-col">
        <div className="w-full px-2 first-letter:md:px-0">
          <Breadcrumb className="text-sm">
            <BreadcrumbItem href="/" name="Home" />
            <BreadcrumbItem href="/help" name="Modos de pagamento" />
          </Breadcrumb>
          <div className="mb-4 md:px-0">
            <h2 className="uppercase font-bold text-sm md:text-base">
              Fala connosco
            </h2>
          </div>
          <div>
            <p className="text-sm">
              Coloque as suas questões através do preenchimento deste
              formulário.
            </p>
            <form action="" className="mt-6 space-y-6">
              <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="name">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  className="p-2 border rounded outline-none focus:border-primary"
                  type="text"
                  id="name"
                  value={message.nome}
                  onChange={(e) =>
                    setMessage({ ...message, nome: e.currentTarget.value })
                  }
                />
              </div>
              {/* <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="tel">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="p-2 border rounded outline-none focus:border-primary"
                  type="email"
                  id="email"
                  value={message.email}
                  onChange={(phone) => {
                    setMessage({
                      ...message,
                      email: phone.currentTarget.value,
                    });
                  }}
                />
              </div> */}

              <div className="space-y-4">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="whatsapp">
                    Whatsapp <span className="text-red-500">*</span>
                  </label>
                  <InputPhoneNumber
                    defaultCountry="ao"
                    required
                    value={message.whatsapp}
                    onChange={(e) => {
                      setMessage({ ...message, whatsapp: e });
                    }}
                  />
                </div>
                {/* <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="email_cliente">Email</label>
                  <input
                    type="text"
                    {...register("email")}
                    id="email_cliente"
                    className="p-2 border rounded outline-none focus:border-primary/60"
                    placeholder="Digite o teu email"
                  />
                </div> */}
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="motivo">
                  Motivo do caso <span className="text-red-500">*</span>
                </label>
                <Select
                  id="motivo"
                  defaultValue="none"
                  className="shadow-none border"
                >
                  <option value="none">Escolha um motivo</option>
                  <option value="1">Opção 1</option>
                  <option value="1">Opção 2</option>
                  <option value="1">Opção 3</option>
                  <option value="1">Opção 4</option>
                  <option value="1">Opção 5</option>
                  <option value="1">Opção 6</option>
                </Select>
              </div>

              <div className="flex flex-col space-y-2 mb-6">
                <label htmlFor="desc">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="desc"
                  cols={30}
                  rows={6}
                  className="border rounded outline-none p-2 focus:border-primary"
                  placeholder="Escreve aqui"
                ></textarea>
              </div>

              <button
                type="submit"
                className="p-3 border rounded-full bg-primary text-white w-full shadow"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <Navigation /> */}
      {/* <Body> */}
      {/* <div className="mb-[120px] w-full flex flex-col">
        <Breadcrumb className="bg-white">
          <BreadcrumbItem name="Apoio ao cliente" href="/" />
          <BreadcrumbItem name="Contacte-nos" href="/" />
        </Breadcrumb>
        <div className="w-auto md:min-w-[400px] mx-auto mt-3 px-2 md:p-0">
          <h2 className="text-xl  text-primary font-bold mb-2">Contacte-nos</h2>

          <p className="text-sm">
            Coloque as suas questões através do preenchimento deste formulário.
          </p>
          <form action="" className="mt-6">
            <div className="flex flex-col space-y-2 mb-4">
              <label htmlFor="name">Nome *</label>
              <input
                className="p-2 border rounded outline-none focus:border-primary"
                type="text"
                id="name"
              />
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <label htmlFor="tel">Email *</label>
              <input
                className="p-2 border rounded outline-none focus:border-primary"
                type="email"
                id="email"
              />
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <label htmlFor="tel">Telefone </label>
              <input
                className="p-2 border rounded outline-none focus:border-primary"
                type="tel"
                id="tel"
              />
            </div>

            <div className="flex flex-col space-y-2 mb-4">
              <label htmlFor="motivo">Motivo do caso *</label>
              <Select
                id="motivo"
                defaultValue="none"
                className="shadow-none border"
              >
                <option value="none">Escolha um motivo</option>
                <option value="1">Opção 1</option>
                <option value="1">Opção 2</option>
                <option value="1">Opção 3</option>
                <option value="1">Opção 4</option>
                <option value="1">Opção 5</option>
                <option value="1">Opção 6</option>
              </Select>
            </div>

            <div className="flex flex-col space-y-2 mb-6">
              <label htmlFor="desc">Descrição *</label>
              <textarea
                id="desc"
                cols={30}
                rows={6}
                className="border rounded outline-none p-2 focus:border-primary"
                placeholder="Escreve aqui"
              ></textarea>
            </div>

            <button
              type="submit"
              className="p-3 border rounded-full bg-primary text-white w-full shadow"
            >
              Enviar
            </button>
          </form>
        </div>
      </div> */}
      {/* </Body> */}
      {/* <Footer /> */}
    </>
  );
}
