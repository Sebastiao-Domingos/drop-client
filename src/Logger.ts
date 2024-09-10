import pino from "pino";

const logger = pino(
  {
    level: "info",
    // transport: {
    //   targets: [
    //     {
    //       level: "error",
    //       target: "teste",
    //       options: {},
    //     },
    //   ],
    // },
  }

  //   prettier()
);

if (process.env.NODE_ENV === "production") {
  logger.level = "error";
}

logger.info(process.env.NODE_ENV);
logger.info("iniciando logger");

export { logger };
