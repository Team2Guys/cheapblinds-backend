import express from "express";

import { categoryControllers } from "./category.controllers.js";
import { verifications } from "#utils/index.js";

const { verifyRole, verifyAccess } = verifications.rest;

export const categoryRoutes = express.Router();

categoryRoutes
  .get("/", categoryControllers.getCategoryList)
  .get("/:id", categoryControllers.getCategoryById)
  .patch(
    "/:id",
    verifyAccess,
    verifyRole(["ADMIN", "SUPER_ADMIN"]),
    categoryControllers.updateCategoryById,
  )
  .delete(
    "/:id",
    verifyAccess,
    verifyRole(["ADMIN", "SUPER_ADMIN"]),
    categoryControllers.removeCategoryById,
  );
