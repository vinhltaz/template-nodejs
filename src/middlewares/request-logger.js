import { logger } from "#lib/logger/logger";

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    logger.http("Request logged", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: responseTime,
      body: req.body,
      params: req.params,
    });
  });

  next();
};

export { requestLogger };
