import { env } from '#config/index.js';
import { prisma } from './prisma.lib.js';
import { logger } from './logger.lib.js';
import { commonUtils } from './common.lib.js';

const { handlePromise } = commonUtils;
const { DATABASE_URL } = env;

export const logDatabaseConnection = handlePromise(async () => {
  await prisma.$connect();
  logger.info(`[connected] Database (url: ${DATABASE_URL})`.service);
});
