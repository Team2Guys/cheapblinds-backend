import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const subCategoryServices = {
  createSubCategory: async (data) => {
    const subCategory = await write.subCategory(data);

    return {
      status: "success",
      message: "Sub-category created successfully",
      data: subCategory,
    };
  },

  getSubCategories: async () => {
    const subCategories = await read.subCategories();

    return {
      status: "success",
      message: "Sub-categories retrieved successfully",
      data: subCategories,
    };
  },

  getSubCategoryById: async ({ id }) => {
    const subCategory = await read.subCategoryById(id);

    if (!subCategory) throw createError(404, "Sub-category not found.");

    return {
      status: "success",
      message: "Sub-category retrieved successfully",
      data: subCategory,
    };
  },

  updateSubCategoryById: async ({ id, ...data }) => {
    const existing = await read.subCategoryById(id);

    if (!existing) throw createError(404, "Sub-category not found.");

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
