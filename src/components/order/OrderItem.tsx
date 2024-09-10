import { twMerge } from "tailwind-merge";
import { ComponentProps, HTMLAttributes } from "react";
import { getCorEstado } from "@/screens/clients/user/Commisions/TableRowEncomenda";
import { Estado } from "@/services/encomenda/admin/estado_encomenda";

interface ItemOrderProps extends HTMLAttributes<HTMLDivElement> {}

export function ItemOrderModal({ children, className = "" }: ItemOrderProps) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-4 p-4 rounded shadow-sm bg-dark-order border-[1px] border-transparent bg-slate-50 hover:border-primary/40 dark:hover:border-primary/50",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ItemOrderModal;

interface FirstPartProps extends ComponentProps<"div"> {
  index: number;
  label: string;
}

export function FirstPartyOfItemOrder({
  index,
  label,
  children,
  className = "",
  ...others
}: FirstPartProps) {
  return (
    <div className={twMerge("flex items-center gap-8", className)} {...others}>
      <span className="w-[30px] h-[30px] flex items-center justify-center bg-primary text-white rounded-full shadow-sm">
        {index}
      </span>
      <div>
        <h3 className="text-xl font-bold">{label}</h3>
        <div className="text-sm text-gray-600 flex">{children}</div>
      </div>
    </div>
  );
}

interface ColumnOfFirstPartProps extends ComponentProps<"span"> {
  tipo?: String;
  valor: String;
}

export function ColumnNoState({
  tipo,
  valor,
  className = "",
  ...others
}: ColumnOfFirstPartProps) {
  return (
    <span {...others}>
      <span
        className={twMerge(
          "inline-block w-2 h-2 ml-4 mr-2 rounded-full",
          className
        )}
      ></span>
      {tipo && (
        <span>
          {tipo} : {valor}
        </span>
      )}
      {!tipo && <span>{valor}</span>}
    </span>
  );
}

interface SecondPartOfOrderItemProps extends ComponentProps<"div"> {}

export function SecondPartOfOrderItem({
  children,
  className = "",
  ...others
}: SecondPartOfOrderItemProps) {
  return (
    <div className={twMerge("flex gap-2 items-center", className)} {...others}>
      {children}
    </div>
  );
}

interface ColumnSecondPartProps extends ComponentProps<"span"> {
  estado: Estado;
}

export function ColumnWithState({
  estado,
  className = "",
  children,
  ...others
}: ColumnSecondPartProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        style={{
          backgroundColor: getCorEstado(estado),
        }}
        className={twMerge(
          "w-[8px] h-[8px] rounded-full bg-red-500",
          className
        )}
        {...others}
      >
        {""}
      </span>
      <p className="text-slate-300 italic text-sm">{children}</p>
    </div>
  );
}
