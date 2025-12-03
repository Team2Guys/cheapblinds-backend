import { orderServices } from "./inquiry.services.js";
import { commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;

export const orderResolvers = {
  Query: {
    getInquiryList: handleAsync(async () => orderServices.getInquiryList()),

    getInquiryById: handleAsync(async (_parent, { id }) => orderServices.getInquiryById(id)),
  },

  Mutation: {
    createInquiry: handleAsync(async (_parent, { input }) => orderServices.createInquiry(input)),

    updateInquiryById: handleAsync(async (_parent, { id, input }) =>
      orderServices.updateInquiryById(id, input),
    ),

    removeInquiryById: handleAsync(async (_parent, { id }) => orderServices.removeInquiryById(id)),
  },
};
