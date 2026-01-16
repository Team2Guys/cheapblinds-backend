import { inquiryServices } from './inquiry.service.js';
import { commonUtils } from '#lib/index.js';
import {
  createInquirySchema,
  updateInquirySchema,
  getInquiryByIdSchema
} from './inquiry.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;

export const inquiryResolvers = {
  Query: {
    inquiryList: handlePromise(() => inquiryServices.getInquiryList()),

    inquiryById: handlePromise((_parent, { id }) => {
      const validated = validate(getInquiryByIdSchema, { id });
      return inquiryServices.getInquiryById(validated.id);
    })
  },

  Mutation: {
    createInquiry: handlePromise((_parent, { input }) => {
      const validated = validate(createInquirySchema, input);
      return inquiryServices.createInquiry(validated);
    }),

    updateInquiryById: handlePromise((_parent, { id, input }) => {
      const validatedId = validate(getInquiryByIdSchema, { id });
      const validatedInput = validate(updateInquirySchema, input);
      return inquiryServices.updateInquiryById(validatedId.id, validatedInput);
    }),

    removeInquiryById: handlePromise((_parent, { id }) => {
      const validated = validate(getInquiryByIdSchema, { id });
      return inquiryServices.removeInquiryById(validated.id);
    })
  }
};
