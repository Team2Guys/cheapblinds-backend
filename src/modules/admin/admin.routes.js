import express from "express";

import { adminControllers } from "./admin.controllers.js";
import { verifications } from "#utils/index.js";

const { verifyRole, verifyAccess } = verifications.rest;

export const adminRoutes = express.Router();

adminRoutes
  .post("/", verifyAccess, verifyRole(["SUPER_ADMIN"]), adminControllers.createAdmin)
  .get("/", adminControllers.getAdminList)
  .get("/:id", adminControllers.getAdminById)
  .patch("/:id", verifyAccess, verifyRole(["SUPER_ADMIN"]), adminControllers.updateAdminById)
  .delete("/:id", verifyAccess, verifyRole(["SUPER_ADMIN"]), adminControllers.removeAdminById);
