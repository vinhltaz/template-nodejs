import { ValidationError } from "#utils/error";
import { z } from "zod";

const createUserInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
});

export const validateCreateUserInput = (input) => {
  try {
    return createUserInputSchema.parse(input);
  } catch (error) {
    throw new ValidationError(error);
  }
};
