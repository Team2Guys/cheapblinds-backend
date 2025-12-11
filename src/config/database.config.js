import { PrismaPg } from '@prisma/adapter-pg';

import { logger } from '#utils/logger.utils.js';
import { commonUtils } from '#utils/common.utils.js';
import { env } from './env.config.js';
import { PrismaClient } from '../../generated/prisma/client.ts';

const { handlePromise } = commonUtils;
const { DATABASE_URL } = env;

const adapter = new PrismaPg({
  connectionString: DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

export const logDatabaseConnection = handlePromise(async () => {
  await prisma.$connect();
  logger.info(`[connected] Database (url: ${DATABASE_URL})`.service);
});
