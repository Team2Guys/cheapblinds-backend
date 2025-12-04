import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

// Helper to validate UUID and ensure the record exists
async function ensureInquireExistance(id) {
  validateUuid(id);
  const inquiry = await read.inquiryById(id);
  if (!inquiry) throw createError(404, "Inquiry does not exist.");
  return inquiry;
}

export const inquiryServices = {
  createInquiry: (input) => write.inquiry(input),

  getInquiryList: read.inquiryList,

  getInquiryById: (id) => {
    validateUuid(id);
    return read.inquiryById(id);
  },

  updateInquiryById: async (id, input) => {
    await ensureInquireExistance(id);
    return update.inquiryById(id, input);
  },

  removeInquiryById: async (id) => {
    await ensureInquireExistance(id);
    return remove.inquiryById(id);
  },
};
