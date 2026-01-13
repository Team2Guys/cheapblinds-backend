import { userCache } from './user.cache.js';
import { userRepository } from './user.repository.js';
import { bcryptUtils } from '#lib/index.js';

const { update, remove } = userRepository;

export const userServices = {
  getUserList: () => userCache.getUserList(),

  getUserById: (id) => userCache.getUserById(id),

  updateUserById: async (id, input) => {
    if (input.password) {
      input.password = await bcryptUtils.hash(input.password);
    }

    const user = await update.userById(id, input);

    await userCache.invalidateUser(id);
    return user;
  },

  removeUserById: async (id) => {
    const user = await remove.userById(id);

    await userCache.invalidateUser(id);
    return user;
  }
};
