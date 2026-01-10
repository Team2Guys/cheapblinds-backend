import { productRepository } from './product.repository.js';
import { redis } from '#lib/index.js';

const { write, read, update, remove } = productRepository;

const CACHE_TTL = 120; // seconds

export const productServices = {
  getProductList: async () => {
    const cacheKey = 'products:list';

    const cachedProducts = await redis.get(cacheKey);
    if (cachedProducts) return JSON.parse(cachedProducts);

    const products = await read.productList();

    await redis.set(cacheKey, JSON.stringify(products), 'EX', CACHE_TTL);
    return products;
  },

  getProductById: async (id) => {
    const cacheKey = `products:id:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const product = await read.productById(id);

    if (product) {
      await redis.set(cacheKey, JSON.stringify(product), 'EX', CACHE_TTL);
    }

    return product;
  },

  getProductBySlugs: async (input) => {
    const { categorySlug, subcategorySlug, productSlug } = input;
    const cacheKey = `products:slug:${categorySlug}:${subcategorySlug}:${productSlug}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('Redis HIT: product by slugs');
      return JSON.parse(cached);
    }

    const product = await read.productBySlugs(input);

    if (product) {
      await redis.set(cacheKey, JSON.stringify(product), 'EX', CACHE_TTL);
    }

    return product;
  },

  createProduct: async (input) => {
    const product = await write.product(input);

    // invalidate caches
    await redis.del('products:list');

    return product;
  },

  updateProductById: async (id, input) => {
    const product = await update.productById(id, input);

    await redis.del('products:list');
    await redis.del(`products:id:${id}`);

    return product;
  },

  removeProductById: async (id) => {
    const product = await remove.productById(id);

    await redis.del('products:list');
    await redis.del(`products:id:${id}`);

    return product;
  }
};
