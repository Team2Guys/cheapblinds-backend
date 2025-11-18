import express from "express";

import { verifications } from "#utils/index.js";
import { authControllers } from "./auth.controllers.js";

const { verifyAccess } = verifications.rest;

export const authRoutes = express
  .Router()
  .post("/signup", authControllers.signup)
  .post("/signin", authControllers.signin)
  .post("/signout", verifyAccess, authControllers.signout)
  .post("/req-password-reset", authControllers.requestPasswordReset)
  .patch("/update-password", authControllers.updatePassword);
