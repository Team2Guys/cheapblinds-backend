import { commonUtils } from "#utils/index.js";
import { fileServices } from "./file.services.js";

const { handleRoutes } = commonUtils;

export const fileControllers = {
  uploadFile: handleRoutes(async (_request, response) => {
    const responseBody = await fileServices.uploadFile();
    response.status(200).json(responseBody);
  }),

  deleteFile: handleRoutes(async (request, response) => {
    const requestParams = request.params;
    const responseBody = await fileServices.deleteFile(requestParams);
    response.status(200).json(responseBody);
  }),
};
