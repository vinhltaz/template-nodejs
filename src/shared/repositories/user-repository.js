import BaseRepository from "./base-repository.js";
import MongoAdapter from "#shared/adapters/database/mongo-adapter";
import { UserModel } from "#api/v1/users/user-model";

const mongoAdapter = new MongoAdapter(UserModel);

class UserRepository extends BaseRepository {
  constructor() {
    super(mongoAdapter);
  }
}

const userRepository = new UserRepository();

export { userRepository };
