import { commonUtils } from "#utils/index.js";
import { categoryServices } from "./category.services.js";

const { handleRoutes } = commonUtils;

export const categoryControllers = {
  createCategory: handleRoutes(async (request, response) => {
    const requestBody = request.body;
    const responseBody = await categoryServices.createCategory(requestBody);
    response.status(201).json(responseBody);
  }),

  getCategoryList: handleRoutes(async (_request, response) => {
    const responseBody = await categoryServices.getCategoryList();
    response.status(200).json(responseBody);
  }),

  getCategoryById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await categoryServices.getCategoryById(requestParams);
    response.status(200).json(responseBody);
  }),

  updateCategoryById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const requestBody = request.body;
    const responseBody = await categoryServices.updateCategoryById({
      ...requestParams,
      ...requestBody,
    });
    response.status(200).json(responseBody);
  }),

  removeCategoryById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await categoryServices.removeCategoryById(requestParams);
    response.status(204).json(responseBody);
  }),
};
