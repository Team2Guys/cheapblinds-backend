import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const subcategoryServices = {
  createSubcategory: async (requestBody) => {
    const subcategory = await write.subcategory(requestBody);

    return {
      status: "success",
      message: "subcategory created successfully",
      data: subcategory,
    };
  },

  getAllSubCategories: async () => {
    const subcategories = await read.subcategories();

    return {
      status: "success",
      message: "Sub-categories retrieved successfully",
      data: subcategories,
    };
  },

  getSubcategoryById: async (requestBody) => {
    const { id } = requestBody;

    const subcategory = await read.subcategoryById(id);

    if (!subcategory) throw createError(404, "subcategory not found.");

    return {
      status: "success",
      message: "subcategory retrieved successfully",
      data: subcategory,
    };
  },

  updateSubcategoryById: async (requestBody) => {
    const { id, ...data } = requestBody;

    const existing = await read.subcategoryById(id);

    if (!existing) throw createError(404, "subcategory not found.");

    const updated = await update.subcategoryById({ id, ...data });

    return {
      status: "success",
      message: "subcategory updated successfully",
      data: updated,
    };
  },

  removeSubcategoryById: async (requestBody) => {
    const { id } = requestBody;

    await remove.subcategoryById(id);

    return {
      status: "success",
      message: "subcategory deleted successfully",
    };
  },
};
