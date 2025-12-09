import { addressServices } from "./address.services.js";
import { verificationUtils, commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;
const { verifyAccess } = verificationUtils;

export const addressResolvers = {
  Mutation: {
    createAddress: handlePromise(
      verifyAccess((_parent, { input }) => addressServices.createAddress(input)),
    ),

    updateAddressById: handlePromise(
      verifyAccess((_parent, { id, input }) => addressServices.updateAddressById(id, input)),
    ),

    removeAddressById: handlePromise(
      verifyAccess((_parent, { id }) => addressServices.removeAddressById(id)),
    ),
  },
};
