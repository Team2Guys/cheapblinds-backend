import { PrismaClient } from "@prisma/client";

import { logger } from "./logger.config.js";
import { env } from "./env.config.js";

const prisma = new PrismaClient();
const { DATABASE_URL } = env;

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info(`[connected] Database (url: ${DATABASE_URL})`.service);
  } catch (error) {
    logger.error(`[connection_failed] Database (error: ${error.message})`.error);
    process.exit(1);
  }
};

export { prisma };
