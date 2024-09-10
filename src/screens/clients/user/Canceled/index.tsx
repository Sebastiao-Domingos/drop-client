"use client";

import { LoadingIcon } from "@/components/Alert";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import { useGetEncomendaCliente } from "@/hooks/useGetEncomendaCliente";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableRowEncomenda from "../Commisions/TableRowEncomenda";

function CanceledScreen() {
  const {
    data: encomendasCanceladas,
    result: resultEncomendasCanceladas,
    filtro: filtroEncomendasCanceladas,
  } = useGetEncomendaCliente({
    currentPage: 1,
    estado: ["Cancelada", ""],
  });

  return (
    <div>
      <Breadcrumb className="text-sm">
        <BreadcrumbItem href="/user/perfil" name="Minha Conta" />
        <BreadcrumbItem href="/user/commissions" name="Encomendas canceladas" />
      </Breadcrumb>
      <div>
        <h2 className="uppercase font-bold">Encomendas canceladas</h2>
      </div>
      <div className="w-full">
        {resultEncomendasCanceladas.isPending && (
          <div className="w-full flex items-center justify-center text-3xl">
            <LoadingIcon />
          </div>
        )}
        {resultEncomendasCanceladas.isError && (
          <p className="text-red-600 text-center">
            Erro ao carregar as encomendas!
          </p>
        )}
        {resultEncomendasCanceladas.isSuccess &&
          encomendasCanceladas?.encomenda.length === 0 && (
            <div className="py-8">
              <p className="text-xs md:text-sm">Nenhuma encomenda encontrada</p>
            </div>
          )}
        {resultEncomendasCanceladas.isSuccess &&
          encomendasCanceladas?.encomenda.length !== 0 && (
            <>
              <TableContainer component={Paper} className="mt-2">
                <Table>
                  <TableHead>
                    <TableRow className="font-bold bg-blue-200/50">
                      <TableCell className="!font-bold">Cod.</TableCell>
                      <TableCell className="!font-bold">
                        Qtd. produtos
                      </TableCell>
                      <TableCell className="!font-bold">Estado</TableCell>
                      <TableCell className="!font-bold">Envio</TableCell>
                      {/* <TableCell>Preço envio</TableCell>
                      <TableCell>Total</TableCell> */}
                      <TableCell className="!font-bold">Detalhes</TableCell>
                      <TableCell className="!font-bold"></TableCell>
                      {/* <TableCell className="!font-bold"></TableCell> */}
                    </TableRow>
                  </TableHead>

                  <TableBody className="dark:bg-gray-900">
                    {encomendasCanceladas?.encomenda.map((encomenda) => (
                      <TableRowEncomenda
                        key={encomenda.id}
                        encomenda={encomenda}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex flex-col justify-center gap-6 md:flex-row mt-6">
                <Pagination
                  onChange={(_, page) => {
                    filtroEncomendasCanceladas({ currentPage: page });
                  }}
                  // defaultPage={data!.currentPage}
                  page={Number(encomendasCanceladas!.currentPage)}
                  count={encomendasCanceladas!.lastPage}
                  color="primary"
                />
                {resultEncomendasCanceladas.isPlaceholderData && (
                  <p>Carregando...</p>
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default CanceledScreen;
