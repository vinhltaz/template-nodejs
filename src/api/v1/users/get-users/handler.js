import { getCache, setCache } from "#lib/cache/cache";
import { logger } from "#lib/logger/logger";
import { userRepository } from "../user-repository.js";
import { getUsersResponse } from "./response.js";

export const getUsersHandler = async (req, res) => {
  try {
    const key = "users";
    let users = getCache(key);
    if (!users) {
      users = await userRepository.find();
      if (users && users.length) {
        users = getUsersResponse(users);
        setCache(key, users);
      }
    }
    res.status(200).json({ users });
  } catch (error) {
    logger.error("getUsersHandler", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
