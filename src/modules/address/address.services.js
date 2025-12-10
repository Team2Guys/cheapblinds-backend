import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { read, write, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const addressServices = {
  getAddressListByUserId: async (userId) => {
    await ensureResourceExists("user", userId);
    return read.addressListByUserId(userId);
  },

  getAddressById: async (id) => {
    await ensureResourceExists("address", id);
    return read.addressById(id);
  },

  createAddress: (input) => write.address(input),

  updateAddressById: async (id, input) => {
    await ensureResourceExists("address", id);
    return update.addressById(id, input);
  },

  removeAddressById: async (id) => {
    await ensureResourceExists("address", id);
    return remove.addressById(id);
  },
};
