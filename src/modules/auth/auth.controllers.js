import { env } from "#config/index.js";
import { commonUtils } from "#utils/index.js";
import { authServices } from "./auth.services.js";

const { handleRoutes } = commonUtils;
const { NODE_ENV } = env;

export const authControllers = {
  signup: handleRoutes(async (req, res) => {
    const reqBody = req.body;
    const resBody = await authServices.signup(reqBody);
    res.status(201).json(resBody);
  }),

  signin: handleRoutes(async (req, res) => {
    const reqBody = req.body;
    const resBody = await authServices.signin(reqBody);

    const {
      data: { accessToken },
    } = resBody;

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true, // cannot be read by JS
        secure: NODE_ENV === "production", // only over HTTPS
        sameSite: "lax", // protects against CSRF
        maxAge: 10 * 60 * 60 * 1000, // 10 hours
      })
      .json({ ...resBody, data: { ...resBody.data, accessToken: undefined } });
  }),

  signout: handleRoutes(async (_req, res) => {
    res
      .status(200)
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({ status: "success", message: "Logged out successfully" });
  }),

  requestPasswordReset: handleRoutes(async (req, res) => {
    const reqBody = req.body;
    const resBody = await authServices.requestPasswordReset(reqBody);
    res.status(200).json(resBody);
  }),

  updatePassword: handleRoutes(async (req, res) => {
    const reqBody = req.body;
    const resBody = await authServices.updatePassword(reqBody);
    res.status(200).json(resBody);
  }),
};
