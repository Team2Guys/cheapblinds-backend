import express from "express";

import { authRoutes } from "#modules/index.js";
import { adminRoutes } from "#modules/admin/admin.routes.js";

// Parent router
export const appRouter = express.Router();

// V1 router
const v1Router = express.Router();

appRouter.use("/api/v1", v1Router);

// V1 routes
v1Router.use("/auth", authRoutes);
v1Router.use("/admins", adminRoutes);
