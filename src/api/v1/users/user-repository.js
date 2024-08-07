import BaseRepository from "#shared/repositories/base-repository";
import MongoAdapter from "#shared/adapters/database/mongo-adapter";
import { UserModel } from "./user-model.js";

const mongoAdapter = new MongoAdapter(UserModel);

class UserRepository extends BaseRepository {
  constructor() {
    super(mongoAdapter);
  }
}

const userRepository = new UserRepository();

export { userRepository };
