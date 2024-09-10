import { numberToMoney } from "@/helpers/functions/numberToMoney";
import { ItemEncomendaCliente } from "@/services/encomenda";
import { TableCell, TableRow } from "@mui/material";
import { precoTotal } from "../user/Commisions/TableRowEncomenda";
import Image from "next/image";

function TableItem({ item }: { item: ItemEncomendaCliente }) {
  return (
    <TableRow className="text-center border-b dark:border-b-gray-800 last:border-0 dark:text-slate-100">
      <TableCell className="text-left py-4 flex items-center gap-1 dark:text-slate-400">
        <Image
          width={64}
          height={64}
          src={item.produto.imagem}
          alt={item.produto.nome}
          loading="lazy"
          className="mr-2"
        />
      </TableCell>
      <TableCell className="text-left py-4 dark:text-slate-400">
        {item.produto.nome}
      </TableCell>
      <TableCell className="dark:text-slate-400">
        {item.cor && (
          <div className="flex flex-row gap-2">
            <span>{item.tamanho}</span>
            <span
              style={{
                backgroundColor: item.cor,
              }}
              className="w-4 h-4 rounded-full inline-block"
            ></span>
          </div>
        )}
      </TableCell>
      <TableCell className="dark:text-slate-400">{item.quantidade}</TableCell>
      <TableCell className="dark:text-slate-400">
        {numberToMoney(item.produto.preco.toString())}
      </TableCell>
      <TableCell className="dark:text-slate-400">
        {numberToMoney(
          precoTotal(item.quantidade, item.produto.preco.toString())
        )}
      </TableCell>
    </TableRow>
  );
}

export default TableItem;
