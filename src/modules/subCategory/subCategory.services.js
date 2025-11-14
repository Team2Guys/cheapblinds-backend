import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const subcategoryServices = {
  createSubcategory: async (input) => {
    const subcategory = await write.subcategory(input);

    return {
      status: "success",
      message: "Subcategory created successfully",
      data: subcategory,
    };
  },

  getAllSubcategories: async () => {
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

    if (!subcategory) throw createError(404, "subcategory not found.");

    return {
      status: "success",
      message: "Subcategory retrieved successfully",
      data: subcategory,
    };
  },

  updateSubcategoryById: async (input) => {
    const { id, ...data } = input;

    const existing = await read.subcategoryById(id);

    if (!existing) throw createError(404, "subcategory not found.");

    const updated = await update.subcategoryById({ id, ...data });

    return {
      status: "success",
      message: "Subcategory updated successfully",
      data: updated,
    };
  },

  removeSubcategoryById: async (input) => {
    const { id } = input;

    await remove.subcategoryById(id);

    return {
      status: "success",
      message: "Subcategory deleted successfully",
    };
  },
};
