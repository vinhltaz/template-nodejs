/**
 * Omits specified fields from the input object based on the keys present in the dto object.
 * If the input object contains a key "_id", it will be mapped to "id" in the result object.
 *
 * @param {object} input - The source object from which fields are to be omitted.
 * @param {object} dto - The object containing the keys to retain in the result.
 * @returns {object} The new object containing only the specified fields from the input.
 */
export const omitFields = (input, dto) => {
  const result = {};
  Object.keys(dto).forEach((key) => {
    if (key in input) {
      result[key] = input[key];
    }
  });
  if ("_id" in input) {
    result["id"] = input["_id"];
  }
  return result;
};
