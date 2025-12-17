import os from 'os';
import express from 'express';

import { apolloServer } from './apollo/server.js';
import { logger, commonUtils, awaitDatabaseConnection } from '#lib/index.js';
import { setupMiddleware } from './middleware/index.js';
import { env } from '#config/index.js';

const { PORT, BACKEND_URL } = env;
const { handlePromise } = commonUtils;

const app = express();

const getNetworkIP = () => {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
};

handlePromise(async function main() {
  await awaitDatabaseConnection();

  await apolloServer.start();

  setupMiddleware(app, apolloServer);

  app.listen(PORT, () => {
    const ip = getNetworkIP();

    logger.info(`
  ➜  Local: ${BACKEND_URL}
  ➜  Network: ${ip ? `http://${ip}:${PORT}` : 'Not available'}
    `);
  });

  app.get('/', (_req, res) => res.json({ status: 'OK' }));
})();

export default app;
