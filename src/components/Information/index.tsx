function Information() {
  return (
    <div className="hidden md:flex flex-col justify-start px-2 py-4 gap-4 md:py-8 md:px-0 md:flex-row md:gap-8 md:justify-between">
      <div className="flex flex-row items-start gap-2">
        <i className="ri-rocket-fill text-2xl md:text-4xl transform rotate-45"></i>
        <p className="text-xs md:text-sm font-light">
          Múltiplas opções de envio, e levantamentos gratuitos em loja.
        </p>
      </div>
      <div className="flex flex-row items-start gap-2">
        <i className="ri-time-fill text-2xl md:text-4xl"></i>
        <p className="text-xs md:text-sm font-light">
          Entregas em 24/48 horas para encomendas efectuadas até às 16:00.
        </p>
      </div>
      <div className="flex flex-row items-start gap-2">
        <i className="ri-lock-fill text-2xl md:text-4xl"></i>
        <p className="text-xs md:text-sm font-light">
          Vários métodos de pagamento online, e transacções 100% seguras.
        </p>
      </div>
      <div className="flex flex-row items-start gap-2">
        <i className="ri-price-tag-3-fill text-2xl md:text-4xl"></i>
        <p className="text-xs md:text-sm font-light">
          Os melhores preços online, 24 horas por dia, 365 dias por ano.
        </p>
      </div>
    </div>
  );
}

export default Information;
