import { env } from './env.config.js';
import { prisma, logger, commonUtils } from '#utils/index.js';

const { handlePromise } = commonUtils;
const { DATABASE_URL } = env;

export const logDatabaseConnection = handlePromise(async () => {
  await prisma.$connect();
  logger.info(`[connected] Database (url: ${DATABASE_URL})`.service);
});
