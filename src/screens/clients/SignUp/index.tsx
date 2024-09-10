'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import ClienteController from '@/controllers/Cliente';
import { useForm } from 'react-hook-form';
import { ClienteData } from '@/services/users/Cliente';
import {
  useGetProvincias,
  useGetProvinciasByPaisId,
} from '@/hooks/useGetProvincia';
import { useEffect, useState } from 'react';
import { AlertFail } from '@/components/Alert';
import InputPhoneNumber from '@/components/InputPhoneNumber';
import { useGetMunicipio } from '@/hooks/useGetMunicipio';
import useGetPais from '@/hooks/useGetPais';
import ModalAviso from '@/components/Alert/ModalAviso';
import { logger } from '@/Logger';

const clienteController = new ClienteController();

function SignUp() {
  const { handleSubmit, register } = useForm<ClienteData>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [localizacao, setLocalizacao] = useState<
    Partial<{ pais: string; provincia: string; municipio: string }>
  >({});

  const [confirmPassword, setConfirmPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tipoConta, setTipoConta] = useState<string>('particular');
  const [showWarning, setShowWarnning] = useState(false);

  const mutation = useMutation({
    mutationFn: clienteController.criar,
    onSuccess() {
      router.push(`/login/verification-code/${whatsapp.replaceAll('+', '')}`);
    },

    onSettled() {
      setIsLoading(false);
    },
  });

  const { data: paises, result: resultPais } = useGetPais();

  const { result, body: provincias } = useGetProvinciasByPaisId();
  const {
    result: municipioResult,
    data: municipios,
    setProvincia,
  } = useGetMunicipio('');

  // useEffect(() => {
  //   if (resultPais.isSuccess && paises?.length) {
  //     logger.info(paises);
  //     setPais_id(paises[0].id!);
  //   }
  // }, [resultPais, setPais_id, paises]);

  // useEffect(() => {
  //   if (result.isSuccess && provincias?.length) {
  //     if (!changeMunicipios) {
  //       setChangeMunicipios(provincias[0].id!);
  //     }
  //     setProvincia(changeMunicipios);
  //   }
  // }, [result, provincias, setProvincia, changeMunicipios]);

  const submitHandler = (data: ClienteData) => {
    if (confirmPassword !== data.senha) {
      // alert("As senhas digitadas não são compatíveis!");
      setShowWarnning(true);
      return;
    }
    data.whatsapp = whatsapp.replaceAll('+', '');

    setIsLoading(true);
    mutation.mutate(data, {});
  };

  return (
    <div className="max-w-[580px] mx-auto p-4">
      <div className="relative pb-2">
        <h2 className="text-primary font-bold md:text-2xl">
          Cadastro de Cliente
        </h2>
        <p className="text-xs italic">
          Os campos marcados com (<span className="text-red-600">*</span>) são
          obrigatórios
        </p>
        <Link href="/" className="absolute top-0 right-0">
          <i className="ri-close-line text-2xl"></i>
        </Link>
      </div>
      <div className="w-full pt-4">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col w-full space-y-4 md:overflow-auto"
        >
          <fieldset disabled={isLoading} className="border rounded p-4">
            <legend className="ml-4 p-2 text-xs">Dados pessoais</legend>
            <div className="space-y-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="">Tipo de conta</label>
                <select
                  className="p-2 outline-none bg-slate-200 rounded w-full"
                  id="tipo"
                  {...register('tipo', { required: true })}
                  onChange={(evt) => {
                    setTipoConta(evt.target.value);
                  }}
                >
                  {/* <option disabled>Escolher o tipo de conta</option> */}
                  <option value="Particular">Particular</option>
                  <option value="Empresa">Empresa</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="nome">
                  {tipoConta.toLowerCase() === 'particular' ||
                  tipoConta.toLowerCase() === ''
                    ? 'Nome completo'
                    : 'Nome da empresa'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('nome', { required: true })}
                  id="nome"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder={
                    tipoConta.toLowerCase() === 'particular' ||
                    tipoConta.toLowerCase() === ''
                      ? 'Digite seu nome'
                      : 'Digite o nome da empresa'
                  }
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="NIF">
                  NIF{' '}
                  {!(
                    tipoConta.toLowerCase() === 'particular' ||
                    tipoConta.toLowerCase() === ''
                  ) && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  {...register('nif', {
                    required: !(
                      tipoConta.toLowerCase() === 'particular' ||
                      tipoConta.toLowerCase() === ''
                    ),
                  })}
                  id="NIF"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder="Digite o teu NIF"
                />
              </div>
            </div>
          </fieldset>

          <fieldset disabled={isLoading} className="border rounded p-4">
            <legend className="ml-4 p-2 text-xs">Contacto</legend>
            <div className="space-y-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="whatsapp">
                  Whatsapp <span className="text-red-500">*</span>
                </label>
                <InputPhoneNumber
                  defaultCountry="ao"
                  required
                  value={whatsapp}
                  onChange={(phone) => {
                    setWhatsapp(phone);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email_cliente">Email</label>
                <input
                  type="text"
                  {...register('email')}
                  id="email_cliente"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder="Digite o teu email"
                />
              </div>
            </div>
          </fieldset>

          <fieldset disabled={isLoading} className="border rounded p-4">
            <legend className="ml-4 p-2 text-xs">Localização</legend>
            <div className="space-y-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="provincia">
                  País <span className="text-red-500">*</span>
                </label>
                <select
                  className="p-2 outline-none bg-slate-200 rounded w-full"
                  id="pais"
                  onChange={(evt) => {
                    setLocalizacao((prev) => ({
                      ...prev,
                      pais: evt.target.value,
                    }));
                    // setProvincia(evt.target.value);
                    // setChangeMunicipios(evt.target.value);
                  }}
                >
                  <option value="" defaultChecked>
                    -- Selecione um país --
                  </option>
                  {resultPais.isSuccess &&
                    paises?.map((pais) => (
                      <option key={pais.id} value={pais.id}>
                        {pais.nome}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="provincia">
                  Província <span className="text-red-500">*</span>
                </label>
                <select
                  className="p-2 outline-none bg-slate-200 rounded w-full"
                  id="provincia"
                  {...register('provincia_id', { required: true })}
                  onChange={(evt) => {
                    setLocalizacao((prev) => ({
                      ...prev,
                      provincia: evt.target.value,
                    }));
                    setProvincia(evt.target.value);
                  }}
                >
                  <option value="" defaultChecked>
                    -- Selecione um província --
                  </option>
                  {result.isSuccess &&
                    provincias
                      ?.filter(
                        (provincia) => provincia.pais_id === localizacao.pais
                      )
                      ?.map((provincia) => (
                        <option key={provincia.id} value={provincia.id}>
                          {provincia.nome}
                        </option>
                      ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="municipio">
                  Município<span className="text-red-500">*</span>
                </label>
                <select
                  placeholder="Município"
                  {...register('municipio_id', { required: true })}
                  id="municipio"
                  className="p-2 outline-none bg-slate-200 rounded w-full"
                  // onChange={(evt) => {
                  //   setLocalizacao((prev) => ({
                  //     ...prev,
                  //     municipio: evt.target.value,
                  //   }));
                  // }}
                >
                  <option value="">-- Selecione um município --</option>
                  {municipioResult.isSuccess &&
                    municipios
                      // ?.filter(
                      //   (municipio) =>
                      //     municipio.provincia_id === localizacao.provincia
                      // )
                      ?.map((municipio) => (
                        <option key={municipio.id} value={municipio.id}>
                          {municipio.nome}
                        </option>
                      ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="bairro">
                  Bairro <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('bairro', { required: true })}
                  id="bairro"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder="Digite o teu bairro"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="rua">Rua</label>
                <input
                  type="text"
                  {...register('rua')}
                  id="rua"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder="Digite o teu rua"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="referencia">
                  Ponto de referência <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('ponto_referencia')}
                  id="referencia"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder="Digite o teu ponto de  referência"
                />
              </div>
            </div>
          </fieldset>

          <fieldset disabled={isLoading} className="border rounded p-4">
            <legend className="ml-4 p-2 text-xs">Segurança</legend>
            <div className="md:flex gap-8 w-full space-y-4 md:space-y-0">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pass1">
                  Palavra-passe <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register('senha')}
                  id="pass1"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder="Digite o tua palavra passe"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pass2">
                  Confirmar a palavra-passe{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  value={confirmPassword}
                  onChange={(evt) => setConfirmPassword(evt.target.value)}
                  type="password"
                  name="pass2"
                  id="pass2"
                  className="p-2 border rounded outline-none focus:border-primary/60"
                  placeholder="Digite a mesma  palavra passe"
                  required
                />
              </div>
            </div>
            <p className="text-blue-600 text-xs mt-2">
              A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma
              minúscula, um número e um caracter especial
            </p>
          </fieldset>

          {mutation.isError && <AlertFail>{mutation.error.message}</AlertFail>}
          <div className="md:pt-4 space-y-2 bg-white dark:bg-transparent">
            <button
              disabled={isLoading}
              type="submit"
              className="block w-full p-4 rounded bg-primary text-white disabled:bg-gray-500 disabled:cursor-wait"
            >
              Cadastrar-se
            </button>
            <Link
              href="/"
              className="block underline text-center p-4 italic text-primary rounded active:text-red-600 disabled:bg-gray-500 disabled:cursor-wait hover:bg-gray-50 transition-colors"
            >
              Já tenho uma conta
            </Link>
          </div>
        </form>
        {showWarning && (
          <ModalAviso
            message="As senhas devem ser iguais!"
            onClose={() => setShowWarnning(false)}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
