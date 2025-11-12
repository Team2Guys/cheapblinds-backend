import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const categoryServices = {
  createCategory: async (data) => {
    const category = await write.category(data);

    return {
      status: "success",
      message: "Category created successfully",
      data: category,
    };
  },

  getCategories: async () => {
    const categories = await read.categories();

    return {
      status: "success",
      message: "Categories retrieved successfully",
      data: categories,
    };
  },

  getCategoryById: async ({ id }) => {
    const category = await read.categoryById(id);

    if (!category) throw createError(404, "Category not found.");

    return {
      status: "success",
      message: "Category retrieved successfully",
      data: category,
    };
  },

  updateCategoryById: async ({ id, ...data }) => {
    const existingCategory = await read.categoryById(id);

    if (!existingCategory) throw createError(404, "Category not found.");

    const updatedCategory = await update.categoryById(id, data);

    return {
      status: "success",
      message: "Category updated successfully",
      data: updatedCategory,
    };
  },

  removeCategoryById: async ({ id }) => {
    await remove.categoryById(id);

    return {
      status: "success",
      message: "Category deleted successfully",
    };
  },
};
