import { userRepository } from './user.repository.js';
import { bcryptUtils } from '#lib/index.js';

const { read, update, remove } = userRepository;

export const userServices = {
  getUserList: () => read.userList(),

  getUserById: (id) => read.userById(id),

  updateUserById: async (id, input) => {
    if (input.password) {
      input.password = await bcryptUtils.hash(input.password);
    }

    return update.userById(id, input);
  },

  removeUserById: (id) => remove.userById(id)
};
