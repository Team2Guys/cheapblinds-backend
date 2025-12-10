import { addressRepository } from './address.repository.js';

const { read, write, update, remove } = addressRepository;

export const addressServices = {
  getAddressListByUserId: (userId) => read.addressListByUserId(userId),

  getAddressById: (id) => read.addressById(id),

  createAddress: (input) => write.address(input),

  updateAddressById: (id, input) => update.addressById(id, input),

  removeAddressById: (id) => remove.addressById(id)
};
