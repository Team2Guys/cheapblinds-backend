import { logger } from "#utils/index.js";

export const errorHandler = async (error, _request, res, _next) => {
  const status = error.statusCode || error.status || 500;
  const message = error.message || "Internal Server Error";
  const stack = error.stack || "No stack trace available";

  const resBody = {
    status: "error",
    message,
    ...(process.env.NODE_ENV === "production" ? {} : { stack }),
  };

  const logMethod = status >= 500 ? "error" : status >= 400 ? "warn" : "info";

  logger[logMethod](JSON.stringify(resBody, null, 2));

  res.status(status).json(resBody);
};
