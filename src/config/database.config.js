import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.config.js";

const prisma = new PrismaClient();

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info("[connected] Database (provider: postgresql)".service);
  } catch (error) {
    logger.error(`[connection_failed] Database (error: ${error.message})`.error);
    process.exit(1);
  }
};

export { prisma };
