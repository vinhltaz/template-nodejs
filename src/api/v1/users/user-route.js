import express from "express";
import { createUserHandler } from "./create-user/handler.js";
import { getUsersHandler } from "./get-users/handler.js";

const router = express.Router();
const routes = express.Router();

routes.post("/", (req, res) => createUserHandler(req, res));
routes.get("/", (req, res) => getUsersHandler(req, res));

router.use("/api/v1/users", routes);

export { router };
