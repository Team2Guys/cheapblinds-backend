import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid, ensureResourceExists } = commonUtils;

export const inquiryServices = {
  createInquiry: (input) => write.inquiry(input),

  getInquiryList: read.inquiryList,

  getInquiryById: (id) => {
    validateUuid(id);
    return read.inquiryById(id);
  },

  updateInquiryById: async (id, input) => {
    await ensureResourceExists("inquiry", id);
    return update.inquiryById(id, input);
  },

  removeInquiryById: async (id) => {
    await ensureResourceExists("inquiry", id);
    return remove.inquiryById(id);
  },
};
