import express from "express";

import { productControllers } from "./product.controllers.js";
import { verifications } from "#utils/index.js";

const { verifyRole, verifyAccess } = verifications.rest;

export const productRoutes = express.Router();

productRoutes
  .get("/", productControllers.getProductList)
  .get("/:id", productControllers.getProductById)
  .patch(
    "/:id",
    verifyAccess,
    verifyRole(["ADMIN", "SUPER_ADMIN"]),
    productControllers.updateProductById,
  )
  .delete(
    "/:id",
    verifyAccess,
    verifyRole(["ADMIN", "SUPER_ADMIN"]),
    productControllers.removeProductById,
  );
