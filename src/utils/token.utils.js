import createError from "http-errors";
import jwt from "jsonwebtoken";

import { env } from "#config/index.js";

const { JWT_SECRET_KEY } = env;

export const tokenUtils = {
  generate: (payload, tokenType) => {
    const options = {
      algorithm: "HS256",
    };

    switch (tokenType) {
      case "verificationToken":
        options.expiresIn = "5m";
        break;
      case "accessToken":
        options.expiresIn = "10m";
        break;
      case "refreshToken":
        options.expiresIn = "7d";
        break;
      case "passwordResetToken":
        options.expiresIn = "5m";
        break;
      default:
        throw createError(400, "Invalid token type specified.");
    }

    if (!JWT_SECRET_KEY) {
      throw createError(500, "JWT secret key is undefined");
    }

    return jwt.sign(payload, JWT_SECRET_KEY, options);
  },

  verify: (token) => {
    if (!JWT_SECRET_KEY) {
      throw createError(500, "JWT secret key is undefined");
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      throw new Error("Invalid token");
    }

    return decoded;
  },

  decode: (token) => {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      throw new Error("Invalid token format");
    }

    return decoded;
  },
};
