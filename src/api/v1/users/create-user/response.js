import { omitFields } from "#utils/object";

const createUserResponseDto = {
  id: "",
  name: "",
  email: "",
  age: 0,
  createdAt: "",
  updatedAt: "",
};

export const createUserResponse = (input) => {
  return omitFields(input, createUserResponseDto);
};
