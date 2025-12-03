import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const inquiryServices = {
  createInquiry: async (input) => write.inquiry(input),

  getInquiryList: () => read.inquiryList(),

  getInquiryById: (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");
    return read.inquiryById(id);
  },

  updateInquiryById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingInquiry = await read.inquiryById(id);
    if (!existingInquiry) throw createError(404, "Inquiry does not exist.");

    return update.inquiryById(id, input);
  },

  removeInquiryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingInquiry = await read.inquiryById(id);
    if (!existingInquiry) throw createError(404, "Inquiry does not exist.");

    return remove.inquiryById(id);
  },
};
