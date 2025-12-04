import createError from "http-errors";

export const commonUtils = {
  handlePromise:
    (fn) =>
    (...args) => {
      try {
        return fn(...args);
      } catch (error) {
        throw createError(error.status || 500, error.message);
      }
    },

  validateUuid: (id) => {
    if (!id) throw createError(400, "Invalid Uuid.");

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) throw createError(400, "Invalid Uuid.");
  },
};
