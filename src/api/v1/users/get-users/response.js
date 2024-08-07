import { omitFields } from "#utils/object";

const getUserResponseDto = {
  id: "",
  name: "",
  email: "",
  age: 0,
  createdAt: "",
  updatedAt: "",
};

export const getUsersResponse = (users = []) => {
  if (!users.length) return [];
  return users.map((user) => omitFields(user, getUserResponseDto));
};
