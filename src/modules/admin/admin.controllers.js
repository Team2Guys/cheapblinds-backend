import { commonUtils } from "#utils/index.js";
import { adminServices } from "./admin.services.js";

const { handleRoutes } = commonUtils;

export const adminControllers = {
  getAdminList: handleRoutes(async (_request, response) => {
    const responseBody = await adminServices.getAdminList();
    response.status(200).json(responseBody);
  }),

  getAdminById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await adminServices.getAdminById(requestParams);
    response.status(200).json(responseBody);
  }),

  updateAdminById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const requestBody = request.body;
    const responseBody = await adminServices.updateAdminById(requestParams, requestBody);
    response.status(200).json(responseBody);
  }),

  removeAdminById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await adminServices.removeAdminById(requestParams);
    response.status(204).json(responseBody);
  }),
};
