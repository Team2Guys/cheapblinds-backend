import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const subcategoryServices = {
  createSubcategory: async (input) => {
    await write.subcategory(input);

    return {
      status: "success",
      message: "Subcategory created successfully",
    };
  },

  getSubcategoryList: async () => {
    const subcategories = await read.subcategories();

    return {
      status: "success",
      message: "Subcategories retrieved successfully",
      data: subcategories,
    };
  },

  getSubcategoryById: async (input) => {
    const { id } = input;

    const subcategory = await read.subcategoryById(id);

    if (!subcategory) throw createError(404, "Subcategory not found.");

    return {
      status: "success",
      message: "Subcategory retrieved successfully",
      data: subcategory,
    };
  },

  updateSubcategoryById: async (input) => {
    const { id, ...rest } = input;

    const existingSubcategory = await read.subcategoryById(id);

    if (!existingSubcategory) throw createError(404, "Subcategory not found.");

    await update.subcategoryById(id, rest);

    return {
      status: "success",
      message: "Subcategory updated successfully",
    };
  },

  removeSubcategoryById: async (input) => {
    const { id } = input;

    const existingSubcategory = await read.subcategoryById(id);

    if (!existingSubcategory) throw createError(404, "Subcategory not found.");

    await remove.subcategoryById(id);

    return {
      status: "success",
      message: "Subcategory deleted successfully",
    };
  },
};
