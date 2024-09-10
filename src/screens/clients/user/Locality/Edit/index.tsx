'use client';
import { LoadingIcon } from '@/components/Alert/Loading';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import { useActionCliente } from '@/hooks/client/useActionClient';
import { useGetDataUsuario } from '@/hooks/useGetClientes';
import { useGetMunicipio } from '@/hooks/useGetMunicipio';
import { useStatus } from '@/hooks/useLoadingStatus';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingStatus from '../../../../../../@types/LoadingStatus';
import { logger } from '@/Logger';
import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { Button } from '@/components/Buttons/Button';
import CreateStatus from '@/components/status/CreateStatus';

function Edit() {
  const navigator = useRouter();
  const { data: usuario, result } = useGetDataUsuario();
  const [form, setForm] = useState({
    bairro: '',
    rua: '',
    ponto_referencia: '',
    municipio_id: '',
  });

  const {
    result: municipioResult,
    data: municipios,
    setProvincia,
  } = useGetMunicipio('');

  useEffect(() => {
    if (usuario === undefined) return;
    setProvincia(
      usuario?.usuario.enderecos_entrega.filter(
        (endereco) => endereco.predefinido
      )[0].endereco.municipio.provincia_id!
    );

    setForm((prev) => ({
      ...prev,
      bairro: usuario?.usuario.enderecos_entrega.filter(
        (endereco) => endereco.predefinido
      )[0].endereco.bairro!,
      rua: usuario?.usuario.enderecos_entrega.filter(
        (endereco) => endereco.predefinido
      )[0].endereco.rua!,
      ponto_referencia: usuario?.usuario.enderecos_entrega.filter(
        (endereco) => endereco.predefinido
      )[0].endereco.ponto_referencia!,
      municipio_id: usuario?.usuario.enderecos_entrega.filter(
        (endereco) => endereco.predefinido
      )[0].endereco.municipio_id!,
    }));
  }, [usuario, setProvincia]);

  const { mutationUpdate } = useActionCliente();
  const updateStatus = useStatus();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatus.setStatus(LoadingStatus.LOADING);

    mutationUpdate.mutate(form, {
      onSuccess() {
        updateStatus.setStatus(LoadingStatus.SUCCESS);
      },
      onError(error) {
        updateStatus.setStatus(LoadingStatus.ERROR);
        logger.info(error);
      },
      onSettled() {
        setTimeout(() => {
          updateStatus.setStatus(LoadingStatus.DONE);
        }, 3000);
      },
    });
  };
  return (
    <div className="w-full space-x-4">
      <div>
        <Breadcrumb className="text-[12px] md:text-sm">
          <BreadcrumbItem href="/user/perfil" name="A minha conta" />
          <BreadcrumbItem href="/user/locality" name="A minha morada" />
          <BreadcrumbItem href="/user/locality/edit" name="Atualizar morada" />
        </Breadcrumb>
      </div>
      <h2 className="uppercase font-bold">Atualizar morada</h2>

      {result.isSuccess && municipioResult.isSuccess && (
        <div className="max-w-[35rem] flex flex-col mt-6">
          <div className="w-full rounded-b mt-0 pr-4">
            <CreateStatus
              status={updateStatus.status}
              textError={mutationUpdate.error?.message || ''}
              textLoading={'Atualizando a morada'}
              textSuccess={'Morada atualizada!'}
            />
          </div>
          {municipioResult.isSuccess && (
            <form onSubmit={handleEdit}>
              <fieldset
                className="w-full pr-4 flex flex-col gap-4"
                disabled={mutationUpdate.isPending}
              >
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="municipio">Província</label>
                  <select
                    placeholder="Província"
                    id="municipio"
                    className="px-2 py-3 outline-none bg-slate-200 rounded w-full disabled:cursor-not-allowed"
                    disabled
                  >
                    <option>
                      {
                        usuario?.usuario.enderecos_entrega[0].endereco.municipio
                          .provincia.nome
                      }
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="municipio">Município</label>
                  <select
                    placeholder="Município"
                    id="municipio"
                    className="px-2 py-3 outline-none bg-slate-200 rounded w-full"
                    value={form.municipio_id}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        municipio_id: e.target.value,
                      }))
                    }
                  >
                    {municipioResult.isSuccess &&
                      municipios?.map((municipio) => (
                        <option
                          key={municipio.id}
                          value={municipio.id}
                          defaultChecked={
                            municipio.id ===
                              usuario?.usuario.enderecos_entrega.filter(
                                (endereco) => endereco.predefinido
                              )[0].endereco.municipio_id &&
                            isEmptyString(municipio.nome!)
                          }
                        >
                          {municipio.nome}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="bairro">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    className="p-3 rounded shadow outline-none focus:outline focus:outline-offset-0 focus:outline-1 focus:outline-primary"
                    value={form.bairro}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, bairro: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cidade">Rua </label>
                  <input
                    type="text"
                    id="cidade"
                    className="p-3 rounded shadow outline-none focus:outline focus:outline-offset-0 focus:outline-1 focus:outline-primary"
                    value={form.rua}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, rua: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="referencia">Ponto de referência</label>
                  <input
                    type="text"
                    id="referencia"
                    className="p-3 rounded shadow outline-none focus:outline focus:outline-offset-0 focus:outline-1 focus:outline-primary"
                    value={form.ponto_referencia}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        ponto_referencia: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex  text-center gap-4 mt-4">
                  <Button
                    label="Cancelar"
                    className="w-full p-3"
                    onClick={() => navigator.push('/user/locality')}
                    type="button"
                    secondary
                  />

                  <Button label="Salvar" className="w-full p-3" type="submit" />
                </div>
              </fieldset>
            </form>
          )}
        </div>
      )}

      {result.isLoading && (
        <div className="w-full flex items-center justify-center text-3xl">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}

export default Edit;
