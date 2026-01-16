import { addressServices } from './address.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';
import {
  createAddressSchema,
  updateAddressSchema,
  addressIdSchema,
  addressListByUserSchema
} from './address.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;
const { verifyAccess } = verificationUtils;

export const addressResolvers = {
  Query: {
    addressListByUserId: handlePromise(
      verifyAccess((_parent, args) => {
        const { userId } = validate(addressListByUserSchema, args);
        return addressServices.getAddressListByUserId(userId);
      })
    ),

    addressById: handlePromise(
      verifyAccess((_parent, args) => {
        const { id } = validate(addressIdSchema, args);
        return addressServices.getAddressById(id);
      })
    )
  },

  Mutation: {
    createAddress: handlePromise(
      verifyAccess((_parent, { input }) => {
        const validated = validate(createAddressSchema, input);
        return addressServices.createAddress(validated);
      })
    ),

    updateAddressById: handlePromise(
      verifyAccess((_parent, { id, input }) => {
        validate(addressIdSchema, { id });
        const validated = validate(updateAddressSchema, input);
        return addressServices.updateAddressById(id, validated);
      })
    ),

    removeAddressById: handlePromise(
      verifyAccess((_parent, args) => {
        const { id } = validate(addressIdSchema, args);
        return addressServices.removeAddressById(id);
      })
    )
  }
};
