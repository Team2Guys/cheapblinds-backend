import { repository } from "#repository/index.js";
import { commonUtils, bcryptUtils } from "#utils/index.js";

const { read, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const userServices = {
  getUserList: () => read.userList(),

  getUserById: async (id) => {
    await ensureResourceExists("user", id);
    return read.userById(id);
  },

  updateUserById: async (id, input) => {
    await ensureResourceExists("user", id);

    if (input.password) {
      input.password = await bcryptUtils.hash(input.password);
    }

    return update.userById(id, input);
  },

  removeUserById: async (id) => {
    await ensureResourceExists("user", id);
    return remove.userById(id);
  },
};
