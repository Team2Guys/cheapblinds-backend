import cors from "cors";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import { expressMiddleware } from "@as-integrations/express4";
import xss from "xss-clean";

// eslint-disable-next-line no-unused-vars
import { logTheme } from "./colors.js";
import { corsOptions } from "./cors.js";
import { apiRateLimiter } from "./rate-limiter.js";
import { tokenUtils } from "#utils/token.utils.js";

export const setupMiddleware = (app, apolloServer) => {
  // Security & performance
  app.use(helmet()); // secure HTTP headers
  app.use(compression()); // response compression

  // GraphQL endpoint
  app.use(
    "/graphql",
    cors(corsOptions), // CORS
    apiRateLimiter, // rate limiting for public APIs
    express.json({ limit: "10mb" }),
    xss(), // sanitize input
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const authHeader = req.headers.authorization;
        let user = null;

        if (authHeader?.startsWith("Bearer ")) {
          const accessToken = authHeader.split(" ")[1];
          try {
            user = tokenUtils.verify(accessToken);
          } catch (err) {
            console.warn("Invalid access token", err.message);
          }
        }

        return { user, req, res };
      },
      csrfPrevention: true, // optional for browser clients
    }),
  );
};
