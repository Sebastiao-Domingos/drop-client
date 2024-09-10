function generateCountdown(future: number) {
  const now = Date.now();

  return {
    isOver: future - now <= 0,
    days: Math.floor((future - now) / 1000 / 60 / 60 / 24)

      .toString()
      .padStart(2, "0"),
    hours: Math.floor(((future - now) / 1000 / 60 / 60) % 24)

      .toString()
      .padStart(2, "0"),
    minutes: Math.floor(((future - now) / 1000 / 60) % 60)

      .toString()
      .padStart(2, "0"),
    seconds: Math.floor(((future - now) / 1000) % 60)

      .toString()
      .padStart(2, "0"),
  };
}

export { generateCountdown };
