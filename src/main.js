import express from "express";

import { apolloServer } from "./apollo.server.js";
import { logger, commonUtils } from "#utils/index.js";
import { setupMiddleware } from "#middleware/index.js";
import { env, connectDatabase } from "#config/index.js";

const { PORT, BACKEND_URL } = env;
const { handlePromise } = commonUtils;

const app = express();

handlePromise(async function main() {
  await connectDatabase();

  await apolloServer.start();

  setupMiddleware(app, apolloServer);

  app.listen(PORT || 5000, () => {
    logger.info(`[connected] Backend (url: ${BACKEND_URL})`.server);
  });
})();
