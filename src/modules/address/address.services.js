import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const addressServices = {
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
