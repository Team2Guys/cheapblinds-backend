import { env } from "#config/index.js";

const { FRONTEND_URL } = env;

export const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};
