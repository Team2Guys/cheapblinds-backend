import createError from 'http-errors';

export const validate = (schema, payload) => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    const message = result.error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');

    throw new createError.BadRequest(`Validation error: ${message}`);
  }

  return result.data;
};
