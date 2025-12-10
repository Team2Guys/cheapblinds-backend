import createError from 'http-errors';

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
    }
};
