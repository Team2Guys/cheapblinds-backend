import { commonUtils } from "#utils/index.js";
import { subcategoryServices } from "./subcategory.services.js";

const { handleRoutes } = commonUtils;

export const subcategoryControllers = {
  getSubcategoryList: handleRoutes(async (_request, response) => {
    const responseBody = await subcategoryServices.getSubcategoryList();
    response.status(200).json(responseBody);
  }),

  getSubcategoryById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await subcategoryServices.getSubcategoryById(requestParams);
    response.status(200).json(responseBody);
  }),

  updateSubcategoryById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const requestBody = request.body;
    const responseBody = await subcategoryServices.updateSubcategoryById({
      ...requestParams,
      ...requestBody,
    });
    response.status(200).json(responseBody);
  }),

  removeSubcategoryById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await subcategoryServices.removeSubcategoryById(requestParams);
    response.status(204).json(responseBody);
  }),
};
