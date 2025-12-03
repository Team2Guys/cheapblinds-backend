import { orderServices } from "./inquiry.services.js";
import { commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;

export const orderResolvers = {
  Query: {
    getInquiryList: handleAsync(() => orderServices.getInquiryList()),

    getInquiryById: handleAsync((_parent, { id }) => orderServices.getInquiryById(id)),
  },

  Mutation: {
    createInquiry: handleAsync((_parent, { input }) => orderServices.createInquiry(input)),

    updateInquiryById: handleAsync((_parent, { id, input }) =>
      orderServices.updateInquiryById(id, input),
    ),

    removeInquiryById: handleAsync((_parent, { id }) => orderServices.removeInquiryById(id)),
  },
};
