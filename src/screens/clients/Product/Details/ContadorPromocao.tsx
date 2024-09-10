import { useCountdown } from "@/hooks/useCountdown";
import Produto from "../../../../../@types/Produto";

interface ContadorPromocaoProps {
  produto: Produto;
}
function ContadorPromocao({ produto }: ContadorPromocaoProps) {
  const { countdown } = useCountdown(
    new Date(produto.itens_promocao[0].promocao.data_fim).getTime()
  );

  return (
    <p className="text-sm">
      {!countdown.isOver && (
        <>
          Termina em:{" "}
          <span className="font-bold text-primary">
            {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
            {countdown.seconds}s
          </span>
        </>
      )}
      {countdown.isOver && (
        <>
          <span className="font-bold text-[#e8474c]">Promoção expirada</span>
        </>
      )}
    </p>
  );
}

export default ContadorPromocao;
