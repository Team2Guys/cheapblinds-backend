import createError from "http-errors";

export const commonUtils = {
  /**
   * Wrapper to handle promise rejections and throw HTTP errors
   * @param {Function} fn - async function to wrap
   * @returns {Function} - wrapped function
   */
  handlePromise:
    (fn) =>
    (...args) => {
      try {
        return fn(...args);
      } catch (error) {
        throw createError(error.status || 500, error.message);
      }
    },

  /**
   * Validate UUID
   * @param {string} id - UUID
   * @returns {void}
   */
  validateUuid: (id) => {
    if (!id) throw createError(400, "Invalid Uuid.");

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) throw createError(400, "Invalid Uuid.");
  },
};
