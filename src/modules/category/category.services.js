import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const categoryServices = {
  createCategory: async (input) => {
    await write.category(input);

    return {
      status: "success",
      message: "Category created successfully",
    };
  },

  getCategoryList: async () => {
    const categories = await read.categories();

    return {
      status: "success",
      message: "Categories retrieved successfully",
      data: categories,
    };
  },

  getCategoryById: async (input) => {
    const { id } = input;

    const category = await read.categoryById(id);

    if (!category) throw createError(404, "Category not found.");

    return {
      status: "success",
      message: "Category retrieved successfully",
      data: category,
    };
  },

  getCategoryByCustomUrl: async (input) => {
    const { customUrl } = input;

    const category = await read.categoryByCustomUrl(customUrl);

    if (!category) throw createError(404, "Category not found.");

    return {
      status: "success",
      message: "Category retrieved successfully",
      data: category,
    };
  },

  updateCategoryById: async (input) => {
    const { id, ...rest } = input;

    const existingCategory = await read.categoryById(id);

    if (!existingCategory) throw createError(404, "Category not found.");

    await update.categoryById(id, rest);

    return {
      status: "success",
      message: "Category updated successfully",
    };
  },

  removeCategoryById: async (input) => {
    const { id } = input;

    const existingCategory = await read.categoryById(id);

    if (!existingCategory) throw createError(404, "Category not found.");

    await remove.categoryById(id);

    return {
      status: "success",
      message: "Category deleted successfully",
    };
  },
};
