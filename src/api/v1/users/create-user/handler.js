import { logger } from "#lib/logger/logger";
import { userRepository } from "../user-repository.js";
import { validateCreateUserInput } from "./request.js";
import { createUserResponse } from "./response.js";

export const createUserHandler = async (req, res) => {
  try {
    const userInput = validateCreateUserInput(req.body);
    if (userInput) {
      const user = await userRepository.create(userInput);
      res.status(201).json({ user: createUserResponse(user) });
    }
  } catch (error) {
    logger.error("createUserHandler", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
