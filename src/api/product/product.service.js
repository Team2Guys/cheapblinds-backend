import { productCache } from './product.cache.js';
import { productRepository } from './product.repository.js';

const { write, update, remove } = productRepository;

export const productServices = {
  getProductList: () => productCache.getProductList(),

  getProductById: (id) => productCache.getProductById(id),

  getProductByPath: ({ path }) => productCache.getProductByPath(path),

  createProduct: async (input) => {
    const product = await write.product(input);
    await productCache.invalidateProduct(product.id);
    return product;
  },

  updateProductById: async (id, input) => {
    const product = await update.productById(id, input);
    await productCache.invalidateProduct(id);
    return product;
  },

  removeProductById: async (id) => {
    const product = await remove.productById(id);
    await productCache.invalidateProduct(id);
    return product;
  }
};
