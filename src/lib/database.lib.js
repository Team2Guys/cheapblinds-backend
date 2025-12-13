import { prisma } from './prisma.lib.js';
import { commonUtils } from './common.lib.js';

const { handlePromise } = commonUtils;

export const awaitDatabaseConnection = handlePromise(async () => {
  await prisma.$connect();
});
