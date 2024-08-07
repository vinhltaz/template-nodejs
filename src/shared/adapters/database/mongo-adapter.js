import mongoose from "mongoose";
import BaseAdapter from "./base-adapter.js";
import { ENV } from "#config/config";
import { logger } from "#lib/logger/logger";
import { LOG_MSG } from "#lib/logger/message";

class MongoAdapter extends BaseAdapter {
  constructor(model) {
    super(model);
  }

  static connect() {
    mongoose
      .connect(ENV.MONGO_URI, {
        maxPoolSize: 20,
      })
      .then(() => logger.info(LOG_MSG.DATABASE_CONNECTED))
      .catch((error) => logger.error("Database connect fail", error));
  }

  static disconnect() {
    mongoose
      .disconnect()
      .then(() => logger.info("Database disconnected"))
      .catch((error) => logger.error("Database disconnect fail", error));
  }
}

export default MongoAdapter;
