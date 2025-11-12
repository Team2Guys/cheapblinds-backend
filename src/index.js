import express from "express";

import { logger, env, connectDatabase } from "#config/index.js";
import { apolloServer } from "./apollo.server.js";
import { setupMiddleware } from "#middleware/index.js";

const { PORT, BACKEND_URL } = env;

const app = express();

(async function main() {
  await connectDatabase();

  await apolloServer.start();

  setupMiddleware(app, apolloServer);

  app.listen(PORT || 5000, () => {
    logger.info(`[connected] Backend (url: ${BACKEND_URL})`.server);
  });
})();
