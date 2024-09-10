import Promoflash from "@/components/Promoflash";
import { useGetPromocoes } from "@/hooks/promocao/client/useGetPromocoes";
import React from "react";

interface PromocaoContainer {
  index: number;
}
function PromocaoContainer({ index }: PromocaoContainer) {
  const { data: dataPromocoes, result: resultPromocoes } = useGetPromocoes();
  return (
    <>
      {resultPromocoes.isSuccess &&
        dataPromocoes &&
        dataPromocoes.length > index && (
          <Promoflash promocao={dataPromocoes![index]} />
        )}
    </>
  );
}

export default PromocaoContainer;
