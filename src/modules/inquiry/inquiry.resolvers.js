import { inquiryServices } from "./inquiry.services.js";
import { commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;

export const inquiryResolvers = {
  Query: {
    getInquiryList: handlePromise(() => inquiryServices.getInquiryList),

    getInquiryById: handlePromise((_parent, { id }) => inquiryServices.getInquiryById(id)),
  },

  Mutation: {
    createInquiry: handlePromise((_parent, { input }) => inquiryServices.createInquiry(input)),

    updateInquiryById: handlePromise((_parent, { id, input }) =>
      inquiryServices.updateInquiryById(id, input),
    ),

    removeInquiryById: handlePromise((_parent, { id }) => inquiryServices.removeInquiryById(id)),
  },
};
