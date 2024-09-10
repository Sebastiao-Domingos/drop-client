'use client';
import { useGetDataUsuario } from '@/hooks/useGetClientes';
import { LoadingIcon } from '@/components/Alert';
import Link from 'next/link';
import { useGetProvincias } from '@/hooks/useGetProvincia';
import { useGetMunicipio } from '@/hooks/useGetMunicipio';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Encomenda } from '@/services/encomenda';
import { isEmptyString } from '@/helpers/functions/isEmptyString';
import ModalAviso from '@/components/Alert/ModalAviso';
import Select from '@/components/Select';
import { useGetEndereco } from '@/hooks/encomenda/cliente/endereco/useGetEndereco';
import { EnderecoData } from '@/services/encomenda/cliente/Endereco';
import PickupTabs, {
  PickupMapContent,
  PickupSelectContent,
} from './PickupTabs';
import { MapProvider } from '@/contexts/MapContext';

import Map from '@/components/Map';
import mapboxgl from 'mapbox-gl';
import { logger } from '@/Logger';
import { useGetPontoPickup } from '@/hooks/pickup/useGetPickup';

enum OpcaoEntrega {
  ENDERECO_CADASTRADO,
  DUNORTE,
  PICKUP,
}

function Checkout() {
  const [showModalWarning, setShowModalWarning] = useState(false);
  const { data, result } = useGetDataUsuario();
  const { data: pickups, result: resultPickout } = useGetPontoPickup({
    valido: '1',
  });
  const { data: enderecosEntrega } = useGetEndereco();

  const [endereco, setEndereco] = useState<EnderecoData>();
  const [enderecoEnvio, setEnderecoEnvio] = useState<{
    tipo: 'recolha' | 'entrega';
    envio: string;
  }>();

  const [sendOption, setSendOption] = useState<OpcaoEntrega>(
    OpcaoEntrega.ENDERECO_CADASTRADO
  );

  const { result: provinciasResult } = useGetProvincias();
  const { setProvincia } = useGetMunicipio('');

  const { body: provinciasFaturacao } = useGetProvincias();
  const {
    data: municipiosFaturacao,
    result: municipiosFaturacaoResult,
    setProvincia: setProvinciaFaturacao,
  } = useGetMunicipio('');

  const [enderecos, setEnderecos] = useState({
    entrega: true,
    faturacao: true,
  });

  const entregasForm = useForm<Encomenda>();
  const faturacaoForm = useForm<Encomenda>();

  // mapa
  const pickupMarkerRef = useRef(new mapboxgl.Marker());
  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    pickupMarkerRef.current.setLngLat([13.2317184, 8.830776]);
  }, []);

  useEffect(() => {
    if (enderecosEntrega && !endereco) {
      const padrao = enderecosEntrega.filter(
        (endereco) => endereco.predefinido
      );
      setEndereco(padrao[0]);
    }
  }, [endereco, enderecosEntrega]);

  useEffect(() => {
    if (data) {
      setProvincia(
        data.usuario.enderecos_entrega.filter(
          (endereco) => endereco.predefinido
        )[0].endereco.municipio.provincia_id
      );
    }
  }, [data, setProvincia]);

  useEffect(() => {
    if (data) {
      setProvinciaFaturacao(
        data.usuario.enderecos_entrega.filter(
          (endereco) => endereco.predefinido
        )[0].endereco.municipio.provincia_id
      );
    }
  }, [data, setProvinciaFaturacao]);

  return (
    <div className="w-full md:max-w-[1000px] mx-auto p-2 md:p-4 /bg-white">
      <HeaderContentCostumer title="Endereço e modo de Envio" checked={1} />

      {result.isLoading && (
        <div className="w-full flex justify-center text-xl">
          <LoadingIcon />
        </div>
      )}

      {result.isError && (
        <div className="w-full text-center">
          <p className="text-red-400">
            Upsi! , Ocorreu um erro ao carregar os dados
          </p>
        </div>
      )}

      {result.isSuccess && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 border-b dark:border-b-gray-800">
            {/* endereço de entrega */}
            <form className="w-full py-4 md:py-6 md:w-[50%]">
              <h3 className="uppercase font-bold">Endereço de entrega</h3>
              <div className="my-4 space-y-3 flex flex-col">
                <label
                  htmlFor="endereco_cadastrado"
                  className="space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="entrega"
                    id="endereco_cadastrado"
                    value={OpcaoEntrega.ENDERECO_CADASTRADO}
                    checked={OpcaoEntrega.ENDERECO_CADASTRADO === sendOption}
                    onChange={() => {
                      setSendOption(OpcaoEntrega.ENDERECO_CADASTRADO);
                    }}
                    className="cursor-pointer"
                  />
                  <span>Receber numa morada</span>
                </label>
                <Select
                  disabled={sendOption !== OpcaoEntrega.ENDERECO_CADASTRADO}
                  onChange={(evt) => {
                    if (evt.target.value === '-1') {
                      setEnderecoEnvio({ envio: '', tipo: 'entrega' });
                      return;
                    }

                    const idx = Number(evt.target.value);
                    const endereco = enderecosEntrega![idx];
                    setEnderecoEnvio({ envio: endereco.id, tipo: 'entrega' });
                    setEndereco(endereco);
                  }}
                  className="w-full"
                >
                  <option value="-1">Selecione o endereço</option>

                  {enderecosEntrega
                    ?.sort((a, _) => (a.predefinido ? -1 : 1))
                    .map((endereco, idx) => (
                      <option
                        key={endereco.id}
                        value={idx}
                        defaultChecked={endereco.predefinido}
                      >
                        {endereco.descricao}
                      </option>
                    ))}
                </Select>
              </div>
              <fieldset disabled={enderecos.entrega}>
                <ul className="space-y-3 md:mb-8 mt-4 text-sm">
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Pais:{' '}
                    </span>
                    <input
                      type="text"
                      name="pais"
                      id="pais_entrega"
                      value={'Angola'}
                      className="p-1 w-full disabled:bg-transparent"
                      readOnly
                    />
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Província :
                    </span>
                    <span className="p-1 w-full">
                      {enderecoEnvio &&
                        enderecoEnvio.tipo === 'entrega' &&
                        endereco?.endereco.municipio.provincia.nome}
                    </span>
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Município :
                    </span>
                    <span className="p-1 w-full">
                      {enderecoEnvio &&
                        enderecoEnvio.tipo === 'entrega' &&
                        endereco?.endereco.municipio.nome}
                    </span>
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Bairro :
                    </span>
                    <span className="p-1 w-full">
                      {enderecoEnvio &&
                        enderecoEnvio.tipo === 'entrega' &&
                        endereco?.endereco.bairro}
                    </span>
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Rua :
                    </span>
                    <span className="p-1 w-full">
                      {enderecoEnvio &&
                        enderecoEnvio.tipo === 'entrega' &&
                        endereco?.endereco.rua}
                    </span>
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Ponto de referência:
                    </span>
                    <span className="p-1 w-full">
                      {enderecoEnvio?.envio &&
                        enderecoEnvio.tipo === 'entrega' &&
                        endereco?.endereco.ponto_referencia}
                    </span>
                  </li>
                </ul>
              </fieldset>
              <button
                disabled
                onClick={() => {
                  setEnderecos((enderecos) => ({
                    ...enderecos,
                    entrega: !enderecos.entrega,
                  }));
                  if (!enderecos.entrega) {
                    entregasForm.reset();
                  }
                }}
                type="button"
                className="p-2 md:px-4 rounded bg-primary/80 text-white disabled:bg-gray-400 hidden"
              >
                {enderecos.entrega ? 'Alterar' : 'Cancelar'}
              </button>
            </form>

            {/* endereço de faturação */}
            <form className="w-full py-4 md:py-6 md:w-[50%]">
              <h3 className="uppercase font-bold">endereço de facturação</h3>
              <div className="my-4 space-y-3 flex-col invisible hidden md:flex">
                <label htmlFor="" className="space-x-2">
                  <input
                    type="radio"
                    name="entrega"
                    value={OpcaoEntrega.ENDERECO_CADASTRADO}
                    checked={OpcaoEntrega.ENDERECO_CADASTRADO === sendOption}
                    onChange={() => {
                      setSendOption(OpcaoEntrega.ENDERECO_CADASTRADO);
                    }}
                  />
                  <span>Receber numa morada</span>
                </label>
                <Select className="w-full">
                  {enderecosEntrega?.map((endereco, idx) => (
                    <option key={endereco.id} value={idx}>
                      {endereco.descricao}
                    </option>
                  ))}
                </Select>
              </div>
              <fieldset disabled={enderecos.faturacao}>
                <ul className="space-y-3 mb-8 mt-4 text-sm">
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Pais:{' '}
                    </span>
                    <input
                      type="text"
                      name="pais"
                      id="pais_entrega"
                      value={'Angola'}
                      className="p-1 w-full disabled:bg-transparent"
                      readOnly
                    />
                    {/* Angola */}
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Província :
                    </span>
                    {provinciasResult.isSuccess && (
                      <select
                        name="provincia"
                        id="provincia"
                        className="p-1 w-full disabled:bg-transparent"
                        onChange={(evt) => {
                          setProvinciaFaturacao(evt.target.value);
                        }}
                      >
                        {provinciasFaturacao?.map((provincia) => (
                          <option
                            key={provincia.id}
                            defaultChecked={
                              provincia.id ===
                              data?.usuario.enderecos_entrega.filter(
                                (endereco) => endereco.predefinido
                              )[0].endereco.municipio.provincia_id
                            }
                            value={provincia.id}
                          >
                            {provincia.nome}
                          </option>
                        ))}
                      </select>
                    )}
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Município :
                    </span>
                    {municipiosFaturacaoResult.isSuccess && (
                      <select
                        // name="municipio"
                        {...faturacaoForm.register(
                          'dados_endereco_faturacao.municipio_id',
                          { required: true }
                        )}
                        id="municipio"
                        className="p-1 w-full disabled:bg-transparent"
                        defaultValue={
                          data?.usuario.enderecos_entrega.filter(
                            (endereco) => endereco.predefinido
                          )[0].endereco.municipio_id
                        }
                      >
                        {municipiosFaturacao?.map((municipio) => (
                          <option
                            key={municipio.id}
                            defaultChecked={
                              municipio.id ===
                              data?.usuario.enderecos_entrega.filter(
                                (endereco) => endereco.predefinido
                              )[0].endereco.municipio_id
                            }
                            value={municipio.id}
                          >
                            {municipio.nome}
                          </option>
                        ))}
                      </select>
                    )}
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Bairro :
                    </span>
                    <input
                      type="text"
                      // name="bairro"
                      {...faturacaoForm.register(
                        'dados_endereco_faturacao.bairro',
                        { required: true }
                      )}
                      id="bairro"
                      defaultValue={
                        data?.usuario.enderecos_entrega.filter(
                          (endereco) => endereco.predefinido
                        )[0].endereco.bairro
                      }
                      className="p-1 w-full disabled:bg-transparent"
                    />
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Rua :
                    </span>
                    <input
                      type="text"
                      // name="rua"
                      id="rua_faturacao"
                      {...faturacaoForm.register(
                        'dados_endereco_faturacao.rua',
                        { required: true }
                      )}
                      defaultValue={
                        data?.usuario.enderecos_entrega.filter(
                          (endereco) => endereco.predefinido
                        )[0].endereco.bairro
                      }
                      className="p-1 w-full disabled:bg-transparent"
                    />
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-slate-500 whitespace-nowrap">
                      Ponto de referência:
                    </span>
                    <input
                      type="text"
                      // name="rua"
                      {...faturacaoForm.register(
                        'dados_endereco_faturacao.ponto_referencia',
                        { required: true }
                      )}
                      id="referencia_faturacao"
                      defaultValue={
                        data?.usuario.enderecos_entrega.filter(
                          (endereco) => endereco.predefinido
                        )[0].endereco.ponto_referencia
                      }
                      className="p-1 w-full disabled:bg-transparent"
                    />
                  </li>
                </ul>
              </fieldset>
              <button
                onClick={() => {
                  setEnderecos((enderecos) => ({
                    ...enderecos,
                    faturacao: !enderecos.faturacao,
                  }));

                  if (!enderecos.faturacao) {
                    faturacaoForm.reset();
                  }
                }}
                type="button"
                className="p-2 md:px-4 rounded bg-primary/80 text-white w-full md:w-auto"
              >
                {enderecos.faturacao ? 'Alterar' : 'Cancelar'}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="w-full md:max-w-[1000px] m-auto py-2 md:py-4 /bg-white">
        {result.isLoading && (
          <div className="w-full flex justify-center text-xl">
            <LoadingIcon />
          </div>
        )}

        {result.isError && (
          <div className="w-full text-center">
            <p className="text-red-400">
              Upsi! , Ocorreu um erro ao carregar os dados
            </p>
          </div>
        )}

        {/* pickups */}
        {result.isSuccess && (
          <div className="space-y-12">
            <div className="pt-2">
              <div className="mt-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="uppercase font-bold">
                      PONTOS DE RECOLHA (PICK UPS)
                    </h3>
                    <div className="my-4 space-y-3 flex flex-col">
                      <label
                        htmlFor="pickup"
                        className="space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="entrega"
                          id="pickup"
                          value={OpcaoEntrega.PICKUP}
                          checked={OpcaoEntrega.PICKUP === sendOption}
                          onChange={() => {
                            setSendOption(OpcaoEntrega.PICKUP);
                          }}
                          className="cursor-pointer"
                        />
                        <span>Pontos de recolha</span>
                      </label>
                      <Select
                        disabled={sendOption !== OpcaoEntrega.PICKUP}
                        onChange={(evt) => {
                          if (Array.isArray(pickups)) {
                            const pickup = pickups.filter(
                              (pick) => pick.id === evt.target.value
                            )[0];

                            if (pickup?.endereco) {
                              logger.info(
                                pickup.endereco.longitude,
                                pickup.endereco.latitude
                              );

                              mapRef.current &&
                                pickupMarkerRef.current
                                  .setLngLat([
                                    Number(
                                      pickup.endereco.longitude || 13.2317184
                                    ),
                                    Number(
                                      pickup.endereco.latitude || 8.830776
                                    ),
                                  ])
                                  .addTo(mapRef.current);

                              logger.info(pickupMarkerRef.current.getLngLat());

                              mapRef.current?.setCenter([
                                Number(pickup.endereco.longitude || 13.2317184),
                                Number(pickup.endereco.latitude || 8.830776),
                              ]);
                            }
                          }

                          if (evt.target.value === '-1') {
                            setEnderecoEnvio({
                              envio: '',
                              tipo: 'recolha',
                            });
                            return;
                          }
                          setEnderecoEnvio({
                            envio: evt.target.value,
                            tipo: 'recolha',
                          });
                        }}
                        className="w-full disabled:cursor-not-allowed"
                      >
                        <option value="-1">Selecione ponto de recolha</option>
                        {Array.isArray(pickups) &&
                          pickups.map((pickup) => (
                            <option key={pickup.id} value={pickup.id}>
                              {pickup.nome}
                            </option>
                          ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    sendOption === OpcaoEntrega.PICKUP ? 'block' : 'hidden'
                  }`}
                >
                  <PickupTabs>
                    <PickupSelectContent>
                      {resultPickout &&
                        Array.isArray(pickups) &&
                        pickups
                          .filter((pick) => pick.id === enderecoEnvio?.envio)
                          .map((filtered) => (
                            <div key={filtered.id} className="mt-6">
                              <h2 className="pb-2 border-l pl-2 my-3 font-bold">
                                {filtered.nome.toUpperCase()}
                              </h2>
                              <ul className="space-y-3 text-sm">
                                <li>
                                  <span className="text-slate-600 font-bold">
                                    Província :{' '}
                                  </span>{' '}
                                  {filtered.endereco.municipio.provincia.nome}
                                </li>
                                <li>
                                  <span className="text-slate-600 font-bold">
                                    Município :{' '}
                                  </span>{' '}
                                  {filtered.endereco.municipio.nome}
                                </li>
                                <li>
                                  <span className="text-slate-600 font-bold">
                                    Bairro :{' '}
                                  </span>{' '}
                                  {filtered.endereco.bairro}
                                </li>
                                <li>
                                  <span className="text-slate-600 font-bold">
                                    Rua :{' '}
                                  </span>{' '}
                                  {filtered.endereco.rua}
                                </li>
                                <li>
                                  <span className="text-slate-600 font-bold">
                                    Ponto de referência :{' '}
                                  </span>{' '}
                                  {filtered.endereco.ponto_referencia}
                                </li>
                                <li>
                                  <span className="text-slate-600 font-bold">
                                    Disponibilidade :{' '}
                                  </span>{' '}
                                  {filtered.disponibilidade}
                                </li>
                                <li>
                                  <span className="text-slate-600 font-bold">
                                    Valor adicional :{' '}
                                  </span>{' '}
                                  {'00'} Kz
                                </li>
                              </ul>
                            </div>
                          ))}
                    </PickupSelectContent>

                    <PickupMapContent>
                      <MapProvider
                        mapAddedCallback={(map) => (mapRef.current = map)}
                      >
                        <Map
                          isDirectionEnabled={true}
                          isCurrentLocationEnabled={true}
                          endPoint={[
                            pickupMarkerRef.current.getLngLat()?.lng || 0,
                            pickupMarkerRef.current.getLngLat()?.lat || 0,
                          ]}
                        />
                      </MapProvider>
                    </PickupMapContent>
                  </PickupTabs>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Link
                    href="/cart"
                    className="p-2 md:px-4 rounded /bg-primary/50 text-primary border border-primary hover:border-red-600 text-center"
                  >
                    <i className="ri-arrow-left-s-line mr-3"></i>Voltar
                  </Link>
                  <Link
                    href="/user/resume"
                    onClick={(evt) => {
                      let encomenda: Partial<Encomenda> =
                        faturacaoForm.getValues();

                      if (
                        isEmptyString(
                          encomenda.dados_endereco_faturacao?.municipio_id
                        ) &&
                        encomenda.dados_endereco_faturacao
                      ) {
                        encomenda.dados_endereco_faturacao.municipio_id =
                          data?.usuario.enderecos_entrega.filter(
                            (endereco) => endereco.predefinido
                          )[0].endereco.municipio_id!;
                      }

                      if (isEmptyString(enderecoEnvio?.envio)) {
                        setShowModalWarning(true);

                        evt.preventDefault();
                        return;
                      }

                      encomenda.endereco_tipo_id = enderecoEnvio?.envio;
                      encomenda.tipo_envio = enderecoEnvio?.tipo;

                      localStorage.setItem(
                        'encomenda',
                        JSON.stringify(encomenda)
                      );
                    }}
                    className="p-2 md:px-4 rounded bg-primary/70 hover:bg-primary/90 text-white text-center"
                  >
                    Próximo <i className="ri-arrow-right-s-line ml-3"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModalWarning && (
          <ModalAviso
            message="Selecione pelo menos um endereço de entrega ou um ponto pick up."
            onClose={() => setShowModalWarning(false)}
            duration={3000}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;

type Props = {
  checked: number;
  title: string;
};

function HeaderContentCostumer({ title, checked }: Props) {
  const { data, result } = useGetDataUsuario();
  const navigatores = [
    {
      name: 'Endereço / envio',
      url: '/user/checkout',
    },
    {
      name: 'Resumo',
      url: 'user/resume',
    },
    {
      name: 'Conclusão',
      url: 'user/resume',
    },
  ];
  return (
    <div className="w-full md:w-auto py-6 /md:px-4 text-center">
      <h2 className="font-bold uppercase text-primary">{title}</h2>

      <div className="w-full flex mt-6">
        <ul className="w-full md:w-auto m-auto flex overflow-hidden">
          {navigatores.map((nav, index) => (
            <li
              key={nav.name}
              // after:content-[""] after:absolute after:w-[40px] after:top-0 after:bottom-0 after:left-[100%] after:rounded-r-full
              className={`relative flex font-semibold uppercase text-[10px] w-[200px] md:text-sm md:w-[325px] md:h-[70px]  bg-primary/10 text-black border-r dark:border-r-gray-800
                
              ${
                index + 1 < checked &&
                'bg-primary/100 text-white cursor-pointer /after:bg-primary/100'
              } ${
                index + 1 === checked &&
                'bg-primary/70 text-white cursor-default /after:bg-primary/70 -after:z-10'
              } ${
                index + 1 > checked && 'cursor-not-allowed /after:bg-primary/0'
              } `}
            >
              <div
                // onClick={() => redirect("/")}
                className={`w-full h-full flex items-center justify-center p-2 md:py-4 md:px-8
                  ${index === 1 && 'pl-10'}
                  ${index === 2 && 'pl-10'}`}
                // disabled={!(index + 1 < checked)}
              >
                {nav.name}
              </div>
              <div
                className={`absolute w-[40px] h-[calc(100%+4px)] -top-[2px] -bottom-[2px] left-[100%] rounded-r-full border-y-2 border-r-2 dark:border-y-1 dark:border-r-gray-800 border-white dark:border-gray-800
                md:text-2xl text-white
                ${index + 1 < checked && 'bg-primary/100'} ${
                  index + 1 === checked && 'bg-primary/70'
                } ${index + 1 > checked && 'bg-primary/0'} }
                `}
              >
                <span
                  className={`h-[50%] text-center absolute top-[50%] left-[60%] md:left-0 -translate-y-[50%] /-left-1 z-10 ${
                    index !== 2 ? 'block' : 'hidden'
                  }`}
                >
                  {index + 1}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {result.isSuccess && (
        <div className="border-t pt-3 mt-5 dark:border-t-gray-800">
          <ul className="flex gap-2 flex-wrap text-xs text-primary/60 italic">
            <li>{data?.usuario.nome}</li>/
            <li>
              {
                data?.usuario.enderecos_entrega.filter(
                  (endereco) => endereco.predefinido
                )[0].endereco.municipio.provincia.nome
              }
            </li>
            /
            <li>
              {
                data?.usuario.enderecos_entrega.filter(
                  (endereco) => endereco.predefinido
                )[0].endereco.municipio.nome
              }
            </li>
            /
            <li>
              {
                data?.usuario.enderecos_entrega.filter(
                  (endereco) => endereco.predefinido
                )[0].endereco.rua
              }{' '}
              <span className="italic">
                (
                {
                  data?.usuario.enderecos_entrega.filter(
                    (endereco) => endereco.predefinido
                  )[0].endereco.ponto_referencia
                }
                )
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export { HeaderContentCostumer };
