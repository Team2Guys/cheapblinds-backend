import { commonUtils } from "#utils/index.js";
import { productServices } from "./product.services.js";

const { handleRoutes } = commonUtils;

export const productControllers = {
  getProductList: handleRoutes(async (_request, response) => {
    const responseBody = await productServices.getProductList();
    response.status(200).json(responseBody);
  }),

  getProductById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await productServices.getProductById(requestParams);
    response.status(200).json(responseBody);
  }),

  updateProductById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const requestBody = request.body;
    const responseBody = await productServices.updateProductById({
      ...requestParams,
      ...requestBody,
    });
    response.status(200).json(responseBody);
  }),

  removeProductById: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await productServices.removeProductById(requestParams);
    response.status(204).json(responseBody);
  }),
};
