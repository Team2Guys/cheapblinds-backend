import { productRepository } from './product.repository.js';
import { cache } from '#lib/index.js';

const { write, read, update, remove } = productRepository;
const CACHE_TTL = 120; // seconds

export const productServices = {
  getProductList: async () => {
    const key = 'products:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const products = await read.productList();
    if (products.length) await cache.set(key, products, CACHE_TTL);
    return products;
  },

  getProductById: async (id) => {
    const key = `products:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const product = await read.productById(id);
    if (product) await cache.set(key, product, CACHE_TTL);
    return product;
  },

  getProductByPaths: async ({ categoryPath, subcategoryPath, productPath }) => {
    const key = `products:path:${categoryPath}:${subcategoryPath}:${productPath}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const product = await read.productByPaths({
      categoryPath,
      subcategoryPath,
      productPath
    });
    if (product) await cache.set(key, product, CACHE_TTL);
    return product;
  },

  createProduct: async (input) => {
    const product = await write.product(input);
    await cache.del('products:list');
    return product;
  },

  updateProductById: async (id, input) => {
    const product = await update.productById(id, input);
    await cache.del('products:list');
    await cache.del(`products:id:${id}`);
    return product;
  },

  removeProductById: async (id) => {
    const product = await remove.productById(id);
    await cache.del('products:list');
    await cache.del(`products:id:${id}`);
    return product;
  }
};
