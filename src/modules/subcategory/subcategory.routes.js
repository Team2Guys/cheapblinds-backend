import express from "express";

import { subcategoryControllers } from "./subcategory.controllers.js";
import { verifications } from "#utils/index.js";

const { verifyRole, verifyAccess } = verifications.rest;

export const subcategoryRoutes = express.Router();

subcategoryRoutes
  .get("/", subcategoryControllers.getSubcategoryList)
  .get("/:id", subcategoryControllers.getSubcategoryById)
  .patch(
    "/:id",
    verifyAccess,
    verifyRole(["ADMIN", "SUPER_ADMIN"]),
    subcategoryControllers.updateSubcategoryById,
  )
  .delete(
    "/:id",
    verifyAccess,
    verifyRole(["ADMIN", "SUPER_ADMIN"]),
    subcategoryControllers.removeSubcategoryById,
  );
