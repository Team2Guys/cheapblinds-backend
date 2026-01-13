import { userRepository } from './user.repository.js';
import { cache } from '#lib/index.js';

const { read } = userRepository;
const CACHE_TTL = 120;

export const userCache = {
  getUserList: async () => {
    const key = 'users:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const users = await read.userList();
    if (users.length) await cache.set(key, users, CACHE_TTL);
    return users;
  },

  getUserById: async (id) => {
    const key = `users:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const user = await read.userById(id);
    if (user) await cache.set(key, user, CACHE_TTL);
    return user;
  },

  invalidateUser: async (id) => {
    await cache.del(`users:id:${id}`);
    await cache.del('users:list');
  }
};
