import os from 'os';
import process from 'process';
import express from 'express';

import { apolloServer } from './apollo/server.js';
import { logger, commonUtils, awaitDatabaseConnection } from '#lib/index.js';
import { setupMiddleware } from './middleware/index.js';
import { env } from '#config/index.js';

const { PORT, BACKEND_URL, NODE_ENV } = env;
const { handlePromise } = commonUtils;

const app = express();

/**
 * Resolve external IPv4 address (same logic Next.js uses internally)
 */
const getNetworkIP = () => {
  const nets = os.networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }

  return null;
};

/**
 * Runtime metadata (mirrors Next.js startup banner)
 */
const RUNTIME_INFO = {
  framework: 'Express Server',
  nodeVersion: process.version,
  envFile: '.env',
  environment: NODE_ENV ?? 'development'
};

handlePromise(async function main() {
  await awaitDatabaseConnection();

  await apolloServer.start();

  setupMiddleware(app, apolloServer);

  app.get('/', (_req, res) => {
    res.json({ status: 'OK' });
  });

  app.listen(PORT, () => {
    const ip = getNetworkIP();

    logger.info(`
⚙️  ${RUNTIME_INFO.framework.white.bold}
  - Node.js: ${RUNTIME_INFO.nodeVersion}
  - Environment: ${RUNTIME_INFO.environment}
  - Environments: ${RUNTIME_INFO.envFile}

  ➜  Local: ${BACKEND_URL}
  ➜  Network: ${ip ? `http://${ip}:${PORT}` : 'Not available'}
`);
  });
})();

export default app;
