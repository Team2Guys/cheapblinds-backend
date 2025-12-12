import { inquiryServices } from './inquiry.service.js';
import { commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;

export const inquiryResolvers = {
  Query: {
    inquiryList: handlePromise(() => inquiryServices.getInquiryList()),

    inquiryById: handlePromise((_parent, { id }) =>
      inquiryServices.getInquiryById(id)
    )
  },

  Mutation: {
    createInquiry: handlePromise((_parent, { input }) =>
      inquiryServices.createInquiry(input)
    ),

    updateInquiryById: handlePromise((_parent, { id, input }) =>
      inquiryServices.updateInquiryById(id, input)
    ),

    removeInquiryById: handlePromise((_parent, { id }) =>
      inquiryServices.removeInquiryById(id)
    )
  }
};
