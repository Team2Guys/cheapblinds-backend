import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const subCategoryServices = {
  createSubCategory: async (data) => {
    const subcategory = await write.subcategory(data);

    return {
      status: "success",
      message: "Sub-category created successfully",
      data: subcategory,
    };
  },

  getSubCategories: async () => {
    const subcategories = await read.subcategories();

    return {
      status: "success",
      message: "Sub-categories retrieved successfully",
      data: subcategories,
    };
  },

  getSubCategoryById: async ({ id }) => {
    const subcategory = await read.subCategoryById(id);

    if (!subcategory) throw createError(404, "Subcategory not found.");

    return {
      status: "success",
      message: "Sub-category retrieved successfully",
      data: subcategory,
    };
  },

  updateSubCategoryById: async ({ id, ...data }) => {
    const existing = await read.subCategoryById(id);

    if (!existing) throw createError(404, "Subcategory not found.");

    const updated = await update.subCategoryById({ id, ...data });

    return {
      status: "success",
      message: "Sub-category updated successfully",
      data: updated,
    };
  },

  removeSubCategoryById: async ({ id }) => {
    await remove.subCategoryById(id);

    return {
      status: "success",
      message: "Sub-category deleted successfully",
    };
  },
};
