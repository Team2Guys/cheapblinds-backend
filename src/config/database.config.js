import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.ts';
import { logger, commonUtils } from '#utils/index.js';

const { handlePromise } = commonUtils;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

export const logDatabaseConnection = handlePromise(async () => {
  await prisma.$connect();
  logger.info(
    `[connected] Database (url: ${process.env.DATABASE_URL})`.service
  );
});
