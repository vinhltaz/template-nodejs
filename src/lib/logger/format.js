import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { LOG_MSG } from "./message.js";

const { format } = winston;

const SENSITIVE_FIELDS = ["password", "token", "secret"];

const filterSensitiveFields = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (SENSITIVE_FIELDS.includes(key)) {
      newObj[key] = "********";
    } else {
      newObj[key] = filterSensitiveFields(obj[key]);
    }
  }

  return newObj;
};

const requestFormat = format.printf(
  ({
    level,
    message,
    timestamp,
    method,
    url,
    statusCode,
    responseTime,
    body,
    params,
  }) => {
    let logMessage = `${timestamp} [${level}] `;
    if (message === LOG_MSG.SERVER_START) {
      return `${logMessage}: ${LOG_MSG.SERVER_START}`;
    }

    if (message === LOG_MSG.SERVER_SHUTDOWN) {
      return `${logMessage}: ${LOG_MSG.SERVER_SHUTDOWN}`;
    }

    if (message === LOG_MSG.DATABASE_CONNECTED) {
      return `${logMessage}: ${LOG_MSG.DATABASE_CONNECTED}`;
    }

    const sanitizedBody = filterSensitiveFields(body);
    const sanitizedParams = filterSensitiveFields(params);

    return `${timestamp} [${level}] ${method} ${url} ${statusCode} - ${responseTime}ms | Body: ${JSON.stringify(
      sanitizedBody,
    )} | Params: ${JSON.stringify(sanitizedParams)}: ${message}`;
  },
);

const combinedFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const errorFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const debugFormat = format.printf(
  ({
    level,
    message,
    timestamp,
    method,
    url,
    statusCode,
    responseTime,
    body,
    params,
    stack,
  }) => {
    const sanitizedBody = filterSensitiveFields(body);
    const sanitizedParams = filterSensitiveFields(params);

    let logMessage = `${timestamp} [${level}] `;

    if (message === LOG_MSG.SERVER_START) {
      return `${logMessage}: ${message}`;
    }

    if (message === LOG_MSG.SERVER_SHUTDOWN) {
      return `${logMessage}: ${message}`;
    }

    if (message === LOG_MSG.DATABASE_CONNECTED) {
      return `${logMessage}: ${LOG_MSG.DATABASE_CONNECTED}`;
    }

    if (method) logMessage += `${method} `;
    if (url) logMessage += `${url} `;
    if (statusCode) logMessage += `${statusCode} `;
    if (responseTime) logMessage += `- ${responseTime}ms `;

    const bodyString = sanitizedBody
      ? `| Body: ${JSON.stringify(sanitizedBody)} `
      : "";
    const paramsString = sanitizedParams
      ? `| Params: ${JSON.stringify(sanitizedParams)} `
      : "";

    return `${logMessage}${bodyString}${paramsString}: ${stack || message}`;
  },
);

export const errorTransport = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  format: format.combine(format.timestamp(), errorFormat),
  maxFiles: "14d",
});

export const combinedTransport = new DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "info",
  format: format.combine(format.timestamp(), combinedFormat),
  maxFiles: "14d",
});

export const requestTransport = new DailyRotateFile({
  filename: "logs/request-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "http",
  format: format.combine(format.timestamp(), requestFormat),
  maxFiles: "14d",
});
