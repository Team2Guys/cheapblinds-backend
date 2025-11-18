import express from "express";

import { fileControllers } from "./file.controllers.js";
import { verifications } from "#utils/index.js";

const { verifyRole, verifyAccess } = verifications.rest;

export const fileRoutes = express.Router();

fileRoutes
  .post("/", verifyAccess, verifyRole(["ADMIN", "SUPER_ADMIN"]), fileControllers.uploadFile)
  .delete("/:id", verifyAccess, verifyRole(["ADMIN", "SUPER_ADMIN"]), fileControllers.deleteFile);
