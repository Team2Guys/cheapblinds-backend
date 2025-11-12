import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const productServices = {
  createProduct: async (requestBody) => {
    const product = await write.product(requestBody);

    return {
      status: "success",
      message: "Product created successfully",
      data: product,
    };
  },

  getProducts: async () => {
    const products = await read.products();

    return {
      status: "success",
      message: "Products retrieved successfully",
      data: products,
    };
  },

  getProductById: async (requestBody) => {
    const { id } = requestBody;

    const product = await read.productById(id);

    if (!product) throw createError(404, "Product not found.");

    return {
      status: "success",
      message: "Product retrieved successfully",
      data: product,
    };
  },

  updateProductById: async (requestBody) => {
    const { id, ...data } = requestBody;

    const existingProduct = await read.productById(id);

    if (!existingProduct) throw createError(404, "Product not found.");

    const updatedProduct = await update.productById({ id, ...data });

    return {
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    };
  },

  removeProductById: async (requestBody) => {
    const { id } = requestBody;

    await remove.productById(id);

    return {
      status: "success",
      message: "Product deleted successfully",
    };
  },
};
