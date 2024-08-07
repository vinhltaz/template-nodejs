import app from "#app";
import { LOG_MSG } from "#lib/logger/message";
import { logger } from "#lib/logger/logger";
import { ENV } from "#config/config";
import MongoAdapter from "#shared/adapters/database/mongo-adapter";

const server = app.listen(ENV.PORT, () => {
  logger.info(LOG_MSG.SERVER_START);
});

process.on("SIGINT", () => {
  server.close(() => {
    logger.info(LOG_MSG.SERVER_SHUTDOWN);
    MongoAdapter.disconnect();
  });
});
