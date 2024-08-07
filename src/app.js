import compression from "compression";
import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import { requestLogger } from "#middlewares/request-logger";
import MongoAdapter from "#shared/adapters/database/mongo-adapter";
import { loadEnvironments, loadRoutes } from "#config/config";
import { notFoundMiddleware } from "#middlewares/not-found";
import { errorMiddleware } from "#middlewares/error";

const app = express();

// Environments
loadEnvironments();

// Database
MongoAdapter.connect();

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Middleware logging
app.use(requestLogger);

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
await loadRoutes(app, path.join(__dirname, "./api/v1"));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
