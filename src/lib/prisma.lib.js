import { PrismaPg } from '@prisma/adapter-pg';

import { env } from '#config/index.js';
import { PrismaClient } from '../../generated/prisma/client.js';

const { DATABASE_URL } = env;

const adapter = new PrismaPg({
  connectionString: DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });
