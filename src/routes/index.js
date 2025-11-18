import express from "express";

import {
  authRoutes,
  adminRoutes,
  categoryRoutes,
  subcategoryRoutes,
  productRoutes,
} from "#modules/index.js";

// Parent router
export const appRouter = express.Router();

// V1 router
const v1Router = express.Router();

appRouter.use("/api/v1", v1Router);

// V1 routes
v1Router.use("/auth", authRoutes);
v1Router.use("/admins", adminRoutes);
v1Router.use("/categories", categoryRoutes);
v1Router.use("/subcategories", subcategoryRoutes);
v1Router.use("/products", productRoutes);
