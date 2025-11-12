import express from "express";

import { commonUtils } from "#utils/index.js";
import { apolloServer } from "./apollo.server.js";
import { setupMiddleware } from "#middleware/index.js";
import { logger, env, connectDatabase } from "#config/index.js";

const { PORT, BACKEND_URL } = env;
const { asyncHandler } = commonUtils;

const app = express();

asyncHandler(async function main() {
  await connectDatabase();

  await apolloServer.start();

  setupMiddleware(app, apolloServer);

  app.get("/health", (_, res) => {
    res.json({ status: "ok" });
  });

  app.listen(PORT || 5000, () => {
    logger.info(`[connected] Backend (url: ${BACKEND_URL})`.server);
  });
})();
