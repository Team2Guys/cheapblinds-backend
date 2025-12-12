import { env } from '#config/index.js';
import { prisma } from './prisma.utils.js';
import { logger } from './logger.utils.js';
import { commonUtils } from './common.utils.js';

const { handlePromise } = commonUtils;
const { DATABASE_URL } = env;

export const logDatabaseConnection = handlePromise(async () => {
  await prisma.$connect();
  logger.info(`[connected] Database (url: ${DATABASE_URL})`.service);
});
