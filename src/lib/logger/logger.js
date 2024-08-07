import winston from "winston";
import {
  combinedTransport,
  debugFormat,
  errorTransport,
  requestTransport,
} from "./format.js";

const { createLogger, format, transports } = winston;

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.errors({ stack: true })),
  transports: [
    new transports.Console({
      level: "debug",
      format: format.combine(format.colorize(), debugFormat),
    }),
    requestTransport,
    errorTransport,
    combinedTransport,
  ],
});

export { logger };
