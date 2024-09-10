import { HTMLAttributes, useEffect, useState } from "react";

interface InputPrecoProps extends HTMLAttributes<HTMLInputElement> {
  onPrecoChange: (preco: string) => void;
  placeholder?: string;
}

function InputPreco({ onPrecoChange, placeholder = "Preço" }: InputPrecoProps) {
  const [preco, setPreco] = useState("0");

  useEffect(() => {
    onPrecoChange(preco);
  }, [preco, onPrecoChange]);

  return (
    <input
      value={preco}
      onInput={(evt) => {
        const value = evt.currentTarget.value.replaceAll(/\s/g, "");
        const values = value.split(",");

        const val = Number(values[0].replaceAll(/\s/g, ""));

        if (!isNaN(val) && !isNaN(Number(values[1] || 0))) {
          setPreco((old) => {
            const fomatted = Intl.NumberFormat().format(Number(values[0]));
            return `${fomatted}${
              values[1] !== undefined ? "," + values[1] : ""
            }`;
          });
        } else {
          setPreco((old) => old);
        }
      }}
      className="p-3 border rounded outline-none focus:border-primary/60"
      type="text"
      //   {...register("preco")}
      // id="referency"
      // name="preco"
      placeholder={placeholder}
      id="preco"
      required
    />
  );
}

export function precoToNumeroValido(preco: string) {
  return preco.replace(",", ".").replaceAll(/\s/g, "");
}

export default InputPreco;
