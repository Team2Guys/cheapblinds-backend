import { addressServices } from './address.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;
const { verifyAccess } = verificationUtils;

export const addressResolvers = {
  Query: {
    addressListByUserId: handlePromise(
      verifyAccess((_parent, { userId }) =>
        addressServices.getAddressListByUserId(userId)
      )
    ),

    addressById: handlePromise(
      verifyAccess((_parent, { id }) => addressServices.getAddressById(id))
    )
  },

  Mutation: {
    createAddress: handlePromise(
      verifyAccess((_parent, { input }) => addressServices.createAddress(input))
    ),

    updateAddressById: handlePromise(
      verifyAccess((_parent, { id, input }) =>
        addressServices.updateAddressById(id, input)
      )
    ),

    removeAddressById: handlePromise(
      verifyAccess((_parent, { id }) => addressServices.removeAddressById(id))
    )
  }
};
