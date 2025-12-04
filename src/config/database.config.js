import { PrismaClient } from "@prisma/client";

import { env } from "./env.config.js";
import { logger, commonUtils } from "#utils/index.js";

const prisma = new PrismaClient();

const { DATABASE_URL } = env;
const { handlePromise } = commonUtils;

export const connectDatabase = handlePromise(async () => {
  await prisma.$connect();
  logger.info(`[connected] Database (url: ${DATABASE_URL})`.service);
});

export { prisma };
