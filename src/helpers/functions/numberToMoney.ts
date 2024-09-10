function numberToMoney(number: string = "0") {
  return (
    Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(Number(number))
      .replace("R$", "")
      .trim() + " kz"
  );
}

export { numberToMoney };
