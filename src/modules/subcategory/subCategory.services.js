import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const subcategoryServices = {
  createSubcategory: async (input) => {
    await write.subcategory(input);
    return { message: "Subcategory created successfully" };
  },

  getSubcategoryList: async () => await read.subcategories(),

  getSubcategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");
    return await read.subcategoryById(id);
  },

  getSubcategoryByUrls: async (input) => {
    const { categoryCustomUrl, subcategoryCustomUrl } = input;
    return await read.subcategoryByUrls(categoryCustomUrl, subcategoryCustomUrl);
  },

  updateSubcategoryById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");
    return await update.subcategoryById(id, input);
  },

  removeSubcategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");
    await remove.subcategoryById(id);
    return { message: "Subcategory deleted successfully" };
  },
};
